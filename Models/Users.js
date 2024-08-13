import Sequelize from "sequelize";
import sequelize from "../Db/db.js";


const Users = sequelize.define(
    "users",
    {
        tblid: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: {
                args: true,
            },
        },
        fname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user_type: {
            type: Sequelize.ENUM('Admin', 'User',),
            allowNull: false,
        },
        rank:{
            type: Sequelize.STRING,
            allowNull: false,
        }

    },
    { timestamps: false }
);


export default Users;