import adminService from "../services/adminService.js";

//Users
const getUsersActive = async (req, res, next) => {
    try {
        const usersActive = await adminService.getUsersActive();
        res.json(usersActive);
    } catch (error) {
        next(error);
    }
}

const getUsersInactive = async (req, res, next) => {
    try {
        const usersInactive = await adminService.getUsersInactive();
        res.json(usersInactive);
    } catch (error) {
        next(error);
    }
}

const activateUser = async (req, res, next) => {
    try {
        const activatedUser = await adminService.activateUser( req.params.id );
        res.json(activatedUser);
    } catch (error) {
        next(error);
    }
}

const deactivateUser = async (req, res, next) => {
    try {
        const deactivatedUser = await adminService.deactivateUser( req.params.id );
        res.json(deactivatedUser);
    } catch (error) {
        next(error);
    }
}

//Accounts
const getAccountsActive = async (req, res, next) => {
    try {
        const accountsActive = await adminService.getAccountsActive();
        res.json(accountsActive);
    } catch (error) {
        next(error);
    }
}

const getAccountsInactive = async (req, res, next) => {
    try {
        const accountsInactive = await adminService.getAccountsInactive();
        res.json(accountsInactive);
    } catch (error) {
        next(error);
    }
}

const blockAccount = async (req, res, next) => {
    try {
        const blockedAccount = await adminService.blockAccount( req.params.id );
        res.json(blockedAccount);
    } catch (error) {
        next(error);
    }
}

const unblockAccount = async (req, res, next) => {
    try {
        const unblockedAccount = await adminService.unblockAccount( req.params.id );
        res.json(unblockedAccount);
    } catch (error) {
        next(error);
    }
}

const closeAccount = async (req, res, next) => {
    try {
        const closedAccount = await adminService.closeAccount( req.params.id );
        res.json(closedAccount);
    } catch (error) {
        next(error);
    }
}

const openAccount = async (req, res, next) => {
    try {
        const openAccount = await adminService.openAccount( req.params.id );
        res.json(openAccount);
    } catch (error) {
        next(error);
    }
}

const monthlyFeeAccount = async (req, res, next) => {
    try {
        const accountFee = await adminService.monthlyFeeAccount( req.params.id, req.body );
        res.json(accountFee);
    } catch (error) {
        next(error);
    }
}

//Transaction
const refundTransaction = async (req, res, next) => {
    try {
        const refundedTransaction = await adminService.refundTransaction( req.params.id );
        res.json(refundedTransaction);
        } catch (error) {
        next(error);
    }
}




export default {
    //Users
    getUsersActive,
    getUsersInactive,
    activateUser,
    deactivateUser,

    //Accounts
    getAccountsActive,
    getAccountsInactive,
    blockAccount,
    unblockAccount,
    closeAccount,
    openAccount,
    monthlyFeeAccount,
    refundTransaction,
}