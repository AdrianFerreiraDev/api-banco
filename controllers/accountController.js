import accountService from "../services/accountService.js";

const createAccount = async (req, res, next) => {
    try {
        const account = await accountService.createAccount(req.body);
        res.status(201).json(account)
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

const accountDeposit = async (req, res, next) => {
    try {
        const deposit = await accountService.accountDeposit(req.body, req.params.id);
        res.json(deposit);
    } catch (error) {
        next(error);
    }
}

const accountSake = async (req, res, next) => {
    try {
        const sake = await accountService.accountSake(req.body, req.params.id);
        res.json(sake);
    } catch (error) {
        next(error);
    }
}

const accountSakeSimulate = async (req, res, next) => {
    try {
        const sakeSimulate = await accountService.accountSakeSimulate(req.body, req.params.id);
        res.json(sakeSimulate);
    } catch (error) {
        next(error)
    }
}

const accountTransfer = async (req, res, next) => {
    try {
        const accountTransfer = await accountService.accountTransfer( req.body );
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
        const accountTransferSimulate = await accountService.accountTransferSimulate( req.body );
        res.json(accountTransferSimulate)
    } catch (error) {
        next(error);
    }
}


export default {
    createAccount,
    getAllAccounts,
    getAccountById,
    getAccountByAccountNumber,
    getAccountBalance,
    accountDeposit,
    accountSake,
    accountSakeSimulate,
    accountTransfer,
    getAccountStatement,
    accountTransferSimulate
}