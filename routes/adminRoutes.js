import express from "express";
import adminController from "../controllers/adminController.js";

const router = express.Router();

//Users
router.get("/users/active", adminController.getUsersActive);
router.get("/users/inactive", adminController.getUsersInactive);
router.patch("/users/:id/activate", adminController.activateUser);
router.patch("/users/:id/deactivate", adminController.deactivateUser);

//Accounts
router.get("/accounts/active", adminController.getAccountsActive);
router.get("/accounts/inactive", adminController.getAccountsInactive);
router.patch("/accounts/:id/block", adminController.blockAccount);
router.patch("/accounts/:id/unblock", adminController.unblockAccount);
router.patch("/accounts/:id/close", adminController.closeAccount);
router.patch("/accounts/:id/open", adminController.openAccount);


export default router;