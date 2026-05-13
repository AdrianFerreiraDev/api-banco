import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

//Users
const getUsersActive = async () => {
    return User.find({ active: true });
}

const getUsersInactive = async () => {
    return User.find({ active: false });
}

const activateUser = async (id) => {
    const activatedUser = await User.findByIdAndUpdate(
        id,
        { active: true }
    )

    if (!activatedUser) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 400;
        throw error;
    }

    return {
        "message": "Usuário ativado com sucesso"
    };
}

const deactivateUser = async (id) => {
    const deactivatedUser = await User.findByIdAndUpdate(
        id,
        { active: false }
    )

    if (!deactivatedUser) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 400;
        throw error;
    }

    if (deactivatedUser.balance > 0) {
        const error = new Error("Não é possível desativar usuário com saldo positivo");
        error.statusCode = 400;
        throw error;
    }

    return {
        "message": "Usuário desativado com sucesso"
    };
}

//Accounts
const getAccountsActive = async () => {
    return Account.find({ active: true });
}

const getAccountsInactive = async () => {
    return Account.find({ active: false });
}

const blockAccount = async (id) => {
    let blockedAccount = await Account.findById(id);

    if (blockedAccount.blocked === true) {
        const error = new Error("Conta já bloqueada");
        error.statusCode = 400;
        throw error;
    }

    blockedAccount = await Account.findByIdAndUpdate(
        id,
        { blocked: true }
    )

    if (!blockedAccount) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 400;
        throw error;
    }

    return {
        message: "Conta bloqueada com sucesso"
    };
}

const unblockAccount = async (id) => {
    let unblockedAccount = await Account.findById(id);

    if (unblockedAccount.blocked === false) {
        const error = new Error("Conta já desbloqueada");
        error.statusCode = 400;
        throw error;
    }

    unblockedAccount = await Account.findByIdAndUpdate(
        id,
        { blocked: false }
    )

    if (!unblockedAccount) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 400;
        throw error;
    }

    return {
        message: "Conta desbloqueada com sucesso"
    };
}

const closeAccount = async (id) => {
    let closedAccount = await Account.findById(id);

    if (!closedAccount) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 400;
        throw error;
    }

    if (closedAccount.balance !== 0) {
        const error = new Error("A conta só pode ser encerrada com saldo zerado");
        error.statusCode = 400;
        throw error;
    }

    closedAccount = await Account.findByIdAndUpdate(
        id,
        { active: false }
    )

    return {
        message: "Conta encerrada com sucesso"
    }
}

const openAccount = async (id) => {
    let openAccount = await Account.findByIdAndUpdate(
        id,
        { active: true }
    );

    if (!openAccount) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 400;
        throw error;
    }

    return {
        message: "Conta aberta com sucesso"
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
}