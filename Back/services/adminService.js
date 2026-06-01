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

const monthlyFeeAccount = async (id, data) => {
    let account = await Account.findById(id);
    const { value, description } = data;

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 400;
        throw error;
    }

    if (account.active === false) {
        const error = new Error("Conta inativa");
        error.statusCode = 400;
        throw error;
    }

    if (account.blocked === true) {
        const error = new Error("Conta bloqueada");
        error.statusCode = 400;
        throw error;
    }

    if (value <= 0) {
        const error = new Error("Valor precisa ser maior que 0");
        error.statusCode = 400;
        throw error;
    }

    if (account.balance <= 0) {
        const error = new Error("Saldo não suficiente");
        error.statusCode = 400;
        throw error;
    }

    account = await Account.findByIdAndUpdate(
        id,
        { balance: account.balance - value }
    )

    Transaction.create({
        accountId: account._id,
        type: "fee",
        value: value,
        previousBalace: account.balance,
        currentBalance: account.balance - value,
        description: description,
        status: "completed"
    })

    return {
        previousBalace: account.balance,
        value: value,
        currentBalance: account.balance - value
    }
}

const getAccountsNegative = async () => {
    return await Account.find({
        balance: { $lt: 0 }
    })
}

const getBiggestBalances = async (limit) => {
    return await Account.find().sort({ balance: -1 }).limit(limit);
}

//Transactions
const refundTransaction = async (id) => {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
        const error = new Error("Transação não encontrada");
        error.statusCode = 400;
        throw error;
    }

    if (transaction.status === "failed" || transaction.status === "canceled") {
        const error = new Error("Transação não concluída");
        error.statusCode = 400;
        throw error;
    }

    if (transaction.type !== "deposit" && transaction.type !== "withdraw" && transaction.type !== "fee") {
        const error = new Error("Tipo de transação não válida");
        error.statusCode = 400;
        throw error;
    }

    let account = await Account.findById(transaction.accountId);

    account = await Account.findByIdAndUpdate(
        account._id,
        { balance: transaction.type === "deposit" ? account.balance - transaction.value : account.balance + transaction.value }
    );

    Transaction.create({
        accountId: account._id,
        type: "reversal",
        value: transaction.value,
        previousBalace: account.balance,
        currentBalance: transaction.type === "deposit" ? account.balance - transaction.value : account.balance + transaction.value,
        description: transaction.description,
        status: "completed"
    });


    return {
        previousBalace: account.balance,
        reversal: transaction.value,
        currentBalance: transaction.type === "deposit" ? account.balance - transaction.value : account.balance + transaction.value
    }


}


const generalReport = async () => {
    const allAccounts = await Account.find()
    let totalBalance = 0;

    for (const account of allAccounts) {
        totalBalance += account.balance
    }

    return {
        totalUsers: await User.countDocuments(),
        totalActiveUsers: await User.countDocuments({ active: true }),
        totalInactiveUsers: await User.countDocuments({ active: false }),
        totalAccounts: await Account.countDocuments(),
        totalActiveAccounts: await Account.countDocuments({ active: true }),
        totalBlockedAccounts: await Account.countDocuments({ blocked: true }),
        totalTransactions: await Transaction.countDocuments(),
        totalBalance: totalBalance
    };
}

const financialReport = async () => {
    const allDeposit = await Transaction.find({
        type: "deposit",
        status: "completed"
    });
    const allWithdraw = await Transaction.find({
        type: "withdraw",
        status: "completed"
    });
    const allTransfer = await Transaction.find({
        $or: [
            { type: "transfer-sent" },
            { type: "transfer-received" }
        ],
        status: "completed"
    })
    const allFee = await Transaction.find({
        type: "fee",
        status: "completed"
    });
    const allReversal = await Transaction.find({
        type: "reversal",
        status: "completed"
    });

    let report = {
        totalDeposit: null,
        totalWithdraw: null,
        totalTransfer: null,
        totalFee: null,
        totalReversal: null
    }

    allDeposit.forEach(transaction => {
        report.totalDeposit += transaction.value
    })
    allWithdraw.forEach(transaction => {
        report.totalWithdraw += transaction.value
    })
    allTransfer.forEach(transaction => {
        report.totalTransfer += transaction.value
    })
    allFee.forEach(transaction => {
        report.totalFee += transaction.value
    })
    allReversal.forEach(transaction => {
        report.totalReversal += transaction.value
    })

    return report;
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
    generalReport,
    financialReport,
    getAccountsNegative,
    getBiggestBalances
}