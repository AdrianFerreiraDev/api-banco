import express from "express";
import accountController from "../controllers/accountController.js";

const router = express.Router();

router.post("/", accountController.createAccount);
router.get("/", accountController.getAllAccounts);
router.get("/:id", accountController.getAccountById);
router.get("/number/:accountNumber", accountController.getAccountByAccountNumber);
router.get("/:id/balance", accountController.getAccountBalance);
router.post("/:id/deposit", accountController.accountDeposit);
router.post("/:id/withdraw", accountController.accountSake);
router.post("/:id/withdraw/simulate", accountController.accountSakeSimulate);
router.post("/transfer/account", accountController.accountTransfer);
router.get("/:id/statement", accountController.getAccountStatement);
router.post("/transfer/simulate", accountController.accountTransferSimulate);



export default router;