import express from "express";
import transactionController from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/me/extract", authMiddleware, transactionController.getMeTransactions);
router.get("/", authMiddleware, adminMiddleware, transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransactionById);
router.get("/type/:type", authMiddleware, adminMiddleware, transactionController.getTransactionByType);
router.get("/value/:min/:max", authMiddleware, adminMiddleware, transactionController.getTransactionByValue);
router.get("/year/:year", authMiddleware, adminMiddleware, transactionController.getTransactionByYear);


export default router;