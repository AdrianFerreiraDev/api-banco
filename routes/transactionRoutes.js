import express from "express";
import transactionController from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransactionById);
router.get("/type/:type", transactionController.getTransactionByType);
router.get("/value/:min/:max", transactionController.getTransactionByValue);
router.get("/year/:year", transactionController.getTransactionByYear);


export default router;