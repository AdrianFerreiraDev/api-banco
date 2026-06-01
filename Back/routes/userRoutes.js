import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/me/account", authMiddleware, userController.getMe);
router.put("/me/account", authMiddleware, userController.updateMe);
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, adminMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser);
router.get("/cpf/:cpf", authMiddleware, adminMiddleware, userController.getUserByCPF);
router.get("/email/:email", authMiddleware, adminMiddleware, userController.getUserByEmail);

// router.get("/:id/accounts", userController.getUserAccounts);

export default router;