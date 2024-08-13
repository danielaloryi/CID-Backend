import Case from "../Models/Case.js";
import { v4 as uuidv4 } from 'uuid';
import { startOfDay, endOfMonth, addMonths, startOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear } from 'date-fns';
import { Op, Sequelize, col, fn } from "sequelize";
import EhibitDevices from "../Models/ExibitDevice.js";




function generateFourNumbers() {
    // Generate a UUID
    const uuid = uuidv4();

    // Convert the UUID to an array of bytes
    const uuidBytes = Buffer.from(uuid.replace(/-/g, ''), 'hex');

    // Extract the first four bytes (32 bits) of the UUID and convert them to an integer
    // This will give you a number in the range [0, 2^32 - 1]
    const uuidInt = uuidBytes.readUInt32BE();

    // Take the modulo to limit the number to four digits
    const fourDigitNumber = uuidInt % 10000;

    return fourDigitNumber;
}

const Create_New_Case = (req, res, next) => {
    const { case_id, case_title, examiners, date, status, device_type, court_order_number,
        device_name,
        device_serial_number,
        description,
        exhibit_devices,
        additional_information
    } = req.body;

    Case.create({
        case_id: `C${generateFourNumbers()}`,
        case_title,
        examiners,
        date,
        status,
        case_title,
        device_type,
        device_name,
        device_serial_number,
        description,
        exhibit_devices,
        court_order_number,
        additional_information
    }).then((response) => {
        res.status(201).send(response);
    }).catch((err) => {
        res.status(500).send(err);
        console.log(err);
    })
}


const Get_All_Cases = (req, res, next) => {
    Case.findAll({ include: [EhibitDevices] }).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    })
}


const Get_unCompletedCase = (req, res, next) => {
    Case.findAll({ where: { status: "Inprogress" } }).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    })
}

const Get_Completed = (req, res, next) => {
    Case.findAll({ where: { status: "Completed" } }).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    })
}



const Get_Graph_For_Months = async (req, res, next) => {
    try {
        const currentDate = new Date();
        const startOfCurrentYear = startOfYear(currentDate);
        const endOfCurrentYear = endOfYear(currentDate);

        const allMonths = Array.from({ length: 12 }, (_, monthIndex) => ({
            [getMonthName(monthIndex + 1)]: 0,
        }));

        const monthlySubscriptions = await Case.findAll({
            attributes: [
                [fn('month', col('date')), 'month'],
                [fn('count', '*'), 'count'],
            ],
            where: {
                date: {
                    [Op.gte]: startOfCurrentYear,
                    [Op.lte]: endOfCurrentYear,
                },
            },
            group: [fn('month', col('date'))],
        });

        monthlySubscriptions.forEach(({ dataValues }) => {
            const monthIndex = dataValues.month - 1;
            allMonths[monthIndex] = {
                [getMonthName(dataValues.month)]: dataValues.count,
            };
        });

        res.json({ monthlyCounts: allMonths });
    } catch (error) {
        next(error);
    }
};

const getMonthName = (monthNumber) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthNumber - 1];
};



const Edit_Case = (req, res, next) => {
    const tblid = req.params.tblid;
    Case.update(req.body, { where: { tblid: tblid } }).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Errror" })
    })
}

const Delete_Cases = (req, res, next) => {
    const tblid = req.params.tblid;

    Case.destroy({ where: { tblid: tblid } }).then((response) => {
        res.sendStatus(200).send(response)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

export { Create_New_Case, Get_All_Cases, Get_Graph_For_Months, Get_unCompletedCase, Get_Completed, Edit_Case, Delete_Cases };