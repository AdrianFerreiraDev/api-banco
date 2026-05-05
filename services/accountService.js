import Account from "../models/Account.js";
import User from "../models/User.js";

const createAccount = async (data) => {
    const { userId, accountNumber, agency, type, balance, limit, active, blocked } = data

    const userExist = await User.findOne({ _id: userId })

    if (!userExist) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 400;
        throw error;
    }

    const userAccountUserId = await Account.findOne({ userId: userId })

    if (userAccountUserId) {
        const error = new Error("Já existe uma conta com esse ID");
        error.statusCode = 400;
        throw error;
    }

    return Account.create({ userId, accountNumber, agency, type, balance, limit, active, blocked })
}

const getAllAccounts = async () => {
    return Account.find();
}

const getAccountById = async (id) => {
    const account = await Account.findById(id);

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }

    return account;
}

const getAccountByAccountNumber = async (accountNumber) => {
    const account = await Account.findOne({ accountNumber: accountNumber });

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }

    return account;
}

const getAccountBalance = async (id) => {
    const account = await Account.findById( id );

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }

    const {balance, limit} = account

    const accountBalance = {balance, limit}

    return accountBalance;
}


export default {
    createAccount,
    getAllAccounts,
    getAccountById,
    getAccountByAccountNumber,
    getAccountBalance
}