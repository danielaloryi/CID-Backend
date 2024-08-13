import { Add_Devices, Get_Cases_BYID } from "../Controllers/Devices.js";
import express from "express";

const Router = express.Router();

Router.post("/add_devices", Add_Devices);
Router.get("/:id", Get_Cases_BYID)



export default Router;