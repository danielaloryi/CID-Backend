import { Create_Account, Login, Change_Password, Get_All_Users, Delete_Users, Forget_Password } from "../Controllers/Users.js";
import express from "express";

const Router = express.Router();

Router.post("/create-account", Create_Account);
Router.post("/login", Login);
Router.put("/change-user-password", Change_Password);
Router.get("/all_users", Get_All_Users);
Router.delete("/:id", Delete_Users);
Router.put("/forgot_password/:username", Forget_Password);





export default Router;