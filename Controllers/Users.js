import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../Models/Users.js";


const Create_Account = async (req, res, next) => {
    const { username, password, user_type, fname, lname, rank } = req.body;
    // const { error } = SignUpschema.validate(req.body);

    // if (error) {
    //   return res.status(400).json({
    //     error: error.details[0].message,
    //   });
    // }

    try {
        const ExistinfUser = await Users.findOne({
            where: { username: username },
        });
        if (ExistinfUser)
            return res.status(400).json({
                message: "User already in exist,try a new Username.",
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }

    const HashPassword = await bcrypt.hash(password, 12);

    try {
        const CreatedUser = await Users.create({
            username,
            password: HashPassword,
            user_type,
            fname,
            lname,
            rank
        });

        if (CreatedUser) {
            const token = jwt.sign(
                { username: Users.username },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );

            res.status(201).json({
                user: CreatedUser,
                token: token,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
};


const Login = async (req, res, next) => {
    const { username, password } = req.body;

    // const { error } = LoginSchema.validate(req.body);

    // if (error) {
    //   return res.status(400).json({
    //     error: error.details[0].message,
    //   });
    // }
    // }

    let user;
    try {
        user = await Users.findOne({ where: { username: username } });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username or password, please try again" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

    let passwordMatch = false;
    try {
        passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: "Invalid username or password, please try again" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

    if (user && passwordMatch) {
        const token = jwt.sign(
            { username: Users.username },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({ user, token });
    }
};



const Change_Password = async (req, res, next) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        const user = await Users.findOne({ where: { username: username } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid old password,Please try again.." });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        await Users.update(
            { password: hashedNewPassword },
            { where: { username: username } }
        );

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const Get_All_Users = (req, res, next) => {
    Users.findAll({}).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        res.status(500).send(err)
    })
}


const Delete_Users = (req, res, next) => {
    const id = req.params.id;

    Users.destroy({ where: { tblid: id } }).then((response) => {
        res.sendStatus(200).send(response)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

const Forget_Password = (req, res, next) => {
    const username = req.params.username;

    const HashPassword = bcrypt.hash(password, 12);
    // check username
    Users.findOne({ where: { username: username } }).then((response) => {

        if (response) {
            Users.update(req.body, { where: { username: username } }).then((response) => {
                res.status(200).send(response);
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Internal Server Error" });
            })
        }
        else {
            res.status(400).json({ message: "Incorrect username, try again" })
        }

    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error!!" })
    })


}

export { Create_Account, Login, Change_Password, Get_All_Users, Delete_Users, Forget_Password };