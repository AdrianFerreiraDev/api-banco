import express from "express";
import accountController from "../controllers/accountController.js";

const router = express.Router();

router.post("/", accountController.createAccount);


export default router;