import express from "express";
import adminController from "../controllers/adminController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//Users
router.get("/users/active", authMiddleware, adminMiddleware, adminController.getUsersActive);
router.get("/users/inactive", authMiddleware, adminMiddleware, adminController.getUsersInactive);
router.patch("/users/:id/activate", authMiddleware, adminMiddleware, adminController.activateUser);
router.patch("/users/:id/deactivate", authMiddleware, adminMiddleware, adminController.deactivateUser);

//Accounts
router.get("/accounts/active", authMiddleware, adminMiddleware, adminController.getAccountsActive);
router.get("/accounts/inactive", authMiddleware, adminMiddleware, adminController.getAccountsInactive);
router.patch("/accounts/:id/block", authMiddleware, adminMiddleware, adminController.blockAccount);
router.patch("/accounts/:id/unblock", authMiddleware, adminMiddleware, adminController.unblockAccount);
router.patch("/accounts/:id/close", authMiddleware, adminMiddleware, adminController.closeAccount);
router.patch("/accounts/:id/open", authMiddleware, adminMiddleware, adminController.openAccount);
router.post("/accounts/:id/monthly-fee", authMiddleware, adminMiddleware, adminController.monthlyFeeAccount);
router.get("/accounts/negative-balance", authMiddleware, adminMiddleware, adminController.getAccountsNegative);
router.get("/accounts/top-balances/:limit", authMiddleware, adminMiddleware, adminController.getBiggestBalances);

//Transactions
router.post("/transactions/:id/refund", authMiddleware, adminMiddleware, adminController.refundTransaction);

router.get("/reports/general", authMiddleware, adminMiddleware, adminController.generalReport);
router.get("/reports/financial", authMiddleware, adminMiddleware, adminController.financialReport);


export default router;