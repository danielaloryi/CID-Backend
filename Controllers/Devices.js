import devicesModal from "../Models/ExibitDevice.js";

const Add_Devices = async (req, res, next) => {

    const { caseid, inputValues } = req.body;

    try {
        const devicesWithCaseID = inputValues.map((device) => ({
            caseid,
            device_type: device.device_type,
            device_name: device.device_name,
            device_serial_number: device.device_serial_number,
            device_description: device.device_description
        }));

        const createdcases = await devicesModal.bulkCreate(devicesWithCaseID);

        res.status(201).send(createdcases);
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        })
    }

}

const Get_Cases_BYID = (req, res, next) => {
    const id = req.params.id;

    devicesModal.findAll({ where: { caseid: id } }).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    })
}


export { Add_Devices, Get_Cases_BYID }