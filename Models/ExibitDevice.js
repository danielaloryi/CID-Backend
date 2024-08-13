import Sequelize from "sequelize";
import sequelize from "../Db/db.js";


const Devices = sequelize.define(
    "devices",
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

        device_type: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        device_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        device_serial_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        device_description: {
            type: Sequelize.STRING,
            allowNull: true,
        },


    },
    // { timestamps: false }
);


export default Devices;