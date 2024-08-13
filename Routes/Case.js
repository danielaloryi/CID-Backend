import express from "express";
import { Create_New_Case, Get_All_Cases, Get_Graph_For_Months, Get_unCompletedCase, Get_Completed, Edit_Case, Delete_Cases } from "../Controllers/Case.js";

const Router = express.Router();

Router.post("/add_case", Create_New_Case);
Router.get("/all_cases", Get_All_Cases);
Router.get("/case_graph", Get_Graph_For_Months);
Router.get("/case_completed", Get_Completed);
Router.get("/case_inprogress", Get_unCompletedCase);
Router.put("/update_case/:tblid", Edit_Case);
Router.delete("/delete_case/:tblid", Delete_Cases);




export default Router;