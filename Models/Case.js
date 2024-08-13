import Sequelize from "sequelize";
import sequelize from "../Db/db.js";
import Devices from "../Models/ExibitDevice.js";


const Cases = sequelize.define(
    "case",
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

        case_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        case_title: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        examiners: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('Completed', 'In Progress Case',),
            allowNull: true,
            defaultValue: "In Progress Case"
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
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        court_order_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        exhibit_devices: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        additional_information: {
            type: Sequelize.STRING,
            allowNull: true,
        }

    },
    // { timestamps: false }
);






Cases.hasMany(Devices, {
    foreignKey: "caseid",
    onDelete: "cascade",
    onUpdate: "cascade",
})

Devices.belongsTo(Cases, {
    foreignKey: "caseid",
    onDelete: "cascade",
    onUpdate: "cascade",
});

export default Cases;
