import accountService from "../services/accountService.js";

const createAccount = async (req, res, next) => {
    try {
        const account = await accountService.createAccount(req.user, req.body);
        res.status(201).json(account)
    } catch (error) {
        next(error);
    }
}

const updateMeAccount = async (req, res, next) => {
    try {
        const updatedAccount = await accountService.updateMeAccount( req.user._id, req.body );
        res.json(updatedAccount);
    } catch (error) {
        next(error);
    }
}

const getMeAccount = async (req, res, next) => {
    try {
        const meAccount = await accountService.getMeAccount( req.user._id );
        res.json(meAccount);
    } catch (error) {
        next(error);
    }
}

const getAllAccounts = async (req, res, next) => {
    try {
        const accounts = await accountService.getAllAccounts();
        res.json(accounts);
    } catch (error) {
        next(error);
    }
}

const getAccountById = async (req, res, next) => {
    try {
        const account = await accountService.getAccountById(req.params.id);
        res.json(account)
    } catch (error) {
        next(error);
    }
}

const getAccountByAccountNumber = async (req, res, next) => {
    try {
        const account = await accountService.getAccountByAccountNumber(req.params.accountNumber);
        res.json(account)
    } catch (error) {
        next(error);
    }
}

const getAccountBalance = async (req, res, next) => {
    try {
        const accountBalance = await accountService.getAccountBalance(req.params.id);
        res.json(accountBalance)
    } catch (error) {
        next(error);
    }
}

const getMeBalance = async (req, res, next) => {
    try {
        const meBalance = await accountService.getMeBalance( req.user._id );
        res.json(meBalance);
    } catch (error) {
        next(error);
    }
}

const accountDeposit = async (req, res, next) => {
    try {
        const deposit = await accountService.accountDeposit(req.body, req.user._id);
        res.json(deposit);
    } catch (error) {
        next(error);
    }
}

const accountWithdraw = async (req, res, next) => {
    try {
        const sake = await accountService.accountWithdraw(req.body, req.user._id);
        res.json(sake);
    } catch (error) {
        next(error);
    }
}

const accountWithdrawSimulate = async (req, res, next) => {
    try {
        const sakeSimulate = await accountService.accountWithdrawSimulate(req.body, req.user._id);
        res.json(sakeSimulate);
    } catch (error) {
        next(error)
    }
}

const accountTransfer = async (req, res, next) => {
    try {
        const accountTransfer = await accountService.accountTransfer( req.user, req.body );
        res.json(accountTransfer)
    } catch (error) {
        next(error);
    }
}

const getAccountStatement = async (req, res, next) => {
    try {
        const accountStatement = await accountService.getAccountStatement( req.params.id );
        res.json(accountStatement);
    } catch (error) {
        next(error)
    }
}

const accountTransferSimulate = async (req, res, next) => {
    try {
        const accountTransferSimulate = await accountService.accountTransferSimulate( req.user, req.body );
        res.json(accountTransferSimulate)
    } catch (error) {
        next(error);
    }
}


export default {
    createAccount,
    updateMeAccount,
    getMeAccount,
    getAllAccounts,
    getAccountById,
    getAccountByAccountNumber,
    getAccountBalance,
    getMeBalance,
    accountDeposit,
    accountWithdraw,
    accountWithdrawSimulate,
    accountTransfer,
    getAccountStatement,
    accountTransferSimulate
}