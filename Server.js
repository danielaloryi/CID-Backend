import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DatabaseConnection from "./Db/db.js";
import Users from "./Models/Users.js";
import Case from "./Models/Case.js";
import UsersRoutes from "./Routes/Users.js";
import CaseRoutes from "./Routes/Case.js";
import Devices from "./Models/ExibitDevice.js";
import DevicesRoutes from "./Routes/Devices.js";


const app = express();
dotenv.config();



app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001", "https://cid-dusky.vercel.app"],
        optionsSuccessStatus: 200,
    })
);

DatabaseConnection.sync({ alter: true })
    .then((result) => {
        if (result) {
            console.log("Database is Connected");
        }
    }).catch((err) => {
        console.log(err);
    });



app.use("/api/users", UsersRoutes);
app.use("/api/cases", CaseRoutes);
app.use("/api/devices", DevicesRoutes);







const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server Currently running on PORT :${PORT}`)
})

