import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/cpf/:cpf", userController.getUserByCPF);
router.get("/email/:email", userController.getUserByEmail);
// router.get("/:id/accounts", userController.getUserAccounts);

export default router;