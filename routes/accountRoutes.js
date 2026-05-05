import express from "express";
import accountController from "../controllers/accountController.js";

const router = express.Router();

router.post("/", accountController.createAccount);
router.get("/", accountController.getAllAccounts);
router.get("/:id", accountController.getAccountById);
router.get("/number/:accountNumber", accountController.getAccountByAccountNumber);
router.get("/:id/balance", accountController.getAccountBalance);
router.


export default router;