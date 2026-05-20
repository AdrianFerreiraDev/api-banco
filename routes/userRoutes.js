import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, userController.getMe);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/cpf/:cpf", userController.getUserByCPF);
router.get("/email/:email", userController.getUserByEmail);
// router.get("/:id/accounts", userController.getUserAccounts);

export default router;