import express from "express";
import accountController from "../controllers/accountController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, accountController.createAccount);
router.get("/", authMiddleware, adminMiddleware, accountController.getAllAccounts);
router.put("/me/update", authMiddleware, accountController.updateMeAccount);
router.get("/me/account", authMiddleware, accountController.getMeAccount);
router.get("/:id", authMiddleware, adminMiddleware, accountController.getAccountById);
router.get("/number/:accountNumber", authMiddleware, adminMiddleware, accountController.getAccountByAccountNumber);
router.get("/:id/balance", authMiddleware, adminMiddleware, accountController.getAccountBalance);
router.get("/me/account/balance", authMiddleware, accountController.getMeBalance);
router.post("/deposit", authMiddleware, accountController.accountDeposit);
router.post("/withdraw", authMiddleware, accountController.accountWithdraw);
router.post("/withdraw/simulate", authMiddleware, accountController.accountWithdrawSimulate);
router.post("/transfer/account", authMiddleware, accountController.accountTransfer);
router.get("/statement", authMiddleware, accountController.getAccountStatement);
router.post("/transfer/simulate", authMiddleware, accountController.accountTransferSimulate);



export default router;