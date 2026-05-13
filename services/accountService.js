import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
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
    const account = await Account.findById(id);

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }

    const { balance, limit } = account

    const accountBalance = { balance, limit, availableBalance: balance + limit }

    return accountBalance;
}

const accountDeposit = async (data, id) => {
    let account = await Account.findById(id);

    async function createTransaction(statusReceived) {
        Transaction.create({
            accountId: account._id,
            type: "deposit",
            value: value,
            previousBalace: account.balance,
            currentBalance: account.balance + value,
            description: description,
            status: statusReceived
        })
    }

    if (!account) {
        createTransaction("failed");
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }

    if (account.active !== true) {
        createTransaction("failed");
        const error = new Error("Conta não está ativa");
        error.statusCode = 400;
        throw error;
    }

    if (account.blocked === true) {
        createTransaction("failed");
        const error = new Error("Conta está bloqueada");
        error.statusCode = 400;
        throw error;
    }

    const { value, description } = data;

    if (value <= 0) {
        createTransaction("failed");
        const error = new Error("O valor é menor do que zero");
        error.statusCode = 400;
        throw error;
    }

    account.balance += value;

    account = await Account.findByIdAndUpdate(
        id,
        { balance: account.balance }
    )

    const deposit = {
        message: "Depósito realizado com sucesso",
        description: description,
        previousBalance: account.balance,
        amountDeposited: value,
        currentBalance: account.balance + value
    }

    createTransaction("completed");

    return deposit;
}

const accountWithdraw = async (data, id) => {
    let account = await Account.findById(id);

    async function createTransaction(statusReceived) {
        Transaction.create({
            accountId: account._id,
            type: "withdraw",
            value: value,
            previousBalace: account.balance,
            currentBalance: account.balance - value,
            description: description,
            status: statusReceived
        })
    }

    if (!account) {
        createTransaction("failed");
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }

    if (account.active !== true) {
        createTransaction("failed");
        const error = new Error("Conta não está ativa");
        error.statusCode = 400;
        throw error;
    }

    if (account.blocked === true) {
        createTransaction("failed");
        const error = new Error("Conta está bloqueada");
        error.statusCode = 400;
        throw error;
    }

    const { value, description } = data;

    if (value <= 0) {
        createTransaction("failed");
        const error = new Error("O valor é menor do que zero");
        error.statusCode = 400;
        throw error;
    }

    let balance = account.balance;

    if (account.type === "current") {
        balance += account.limit
    }

    if (value > balance) {
        createTransaction("failed");
        const error = new Error("O valor é maior do que o disponivel");
        error.statusCode = 400;
        throw error;
    }

    account.balance -= value;

    account = await Account.findByIdAndUpdate(
        id,
        { balance: account.balance }
    )

    const deposit = {
        message: "Depósito realizado com sucesso",
        description: description,
        previousBalance: account.balance,
        amountSaked: value,
        currentBalance: account.balance - value
    }

    createTransaction("completed");

    return deposit;
}

const accountWithdrawSimulate = async (data, id) => {
    let account = await Account.findById(id);

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }

    if (account.active !== true) {
        const error = new Error("Conta não está ativa");
        error.statusCode = 400;
        throw error;
    }

    if (account.blocked === true) {
        const error = new Error("Conta está bloqueada");
        error.statusCode = 400;
        throw error;
    }

    const { value } = data;

    if (value <= 0) {
        const error = new Error("O valor é menor do que zero");
        error.statusCode = 400;
        throw error;
    }

    let balance = account.balance;

    if (account.type === "current") {
        balance += account.limit
    }

    if (value > balance) {
        const error = new Error("O valor é maior do que o disponivel");
        error.statusCode = 400;
        throw error;
    }

    account.balance -= value;

    const deposit = {
        canWithdraw: true,
        currentBalance: account.balance + value,
        amountSaked: value,
        balanceAfterSake: account.balance
    }

    return deposit;
}

const accountTransfer = async (data) => {
    let fromAccount = await Account.findById(data.fromAccountId);
    let toAccount = await Account.findById(data.toAccountId);
    const { value, description } = data;

    async function createTransaction(account, type, previousBalace, currentBalance) {
        Transaction.create({
            accountId: account._id,
            type: type,
            value: value,
            previousBalace: previousBalace,
            currentBalance: currentBalance,
            description: description,
            status: "completed"       
        })
    }

    if (!fromAccount || !toAccount) {
        const error = new Error("Conta de destino ou de origem não encontrada");
        error.statusCode = 400;
        throw error;
    }
    if (fromAccount.active !== true || toAccount.active !== true) {
        const error = new Error("Conta de destino ou de origem inativa");
        error.statusCode = 400;
        throw error;
    }
    if (fromAccount.blocked === true || toAccount.blocked === true) {
        const error = new Error("Conta de destino ou de origem bloqueada");
        error.statusCode = 400;
        throw error;
    }
    if (value <= 0) {
        const error = new Error("Valor menor que zero");
        error.statusCode = 400;
        throw error;
    }
    if (fromAccount === toAccount) {
        const error = new Error("Mesma conta origem e destino");
        error.statusCode = 400;
        throw error;
    }

    let balance = fromAccount.balance;

    if (fromAccount.type === "current") {
        balance += fromAccount.limit
    }

    if (value > balance) {
        const error = new Error("O valor é maior do que o disponivel");
        error.statusCode = 400;
        throw error;
    }

    fromAccount.balance -= value;

    fromAccount = await Account.findByIdAndUpdate(
        fromAccount._id,
        { balance: fromAccount.balance }
    )

    toAccount.balance += value;

    toAccount = await Account.findByIdAndUpdate(
        toAccount._id,
        { balance: toAccount.balance }
    )

    const messageTranfer = {
        "message": "Transferência realizada com sucesso",
        "origin": {
            "previousBalance": fromAccount.balance,
            "currentBalance": fromAccount.balance - value
        },
        "destination": {
            "previousBalance": toAccount.balance,
            "currentBalance": toAccount.balance + value
        },
        "description": description
    }

    createTransaction(fromAccount, "transfer-sent", fromAccount.balance, fromAccount.balance - value);
    createTransaction(toAccount, "transfer-received", toAccount.balance, toAccount.balance + value);

    return messageTranfer;
}

const getAccountStatement = async (id) => {
    const accountExists = await Account.findById( id );

    if (!accountExists) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 400;
        throw error;
    }
    
    const transactions = await Transaction.find({ accountId: id });

    return transactions.filter( transaction =>  transaction.status === "completed" );
}

const accountTransferSimulate = async (data) => {
    let fromAccount = await Account.findById(data.fromAccountId);
    let toAccount = await Account.findById(data.toAccountId);
    const { value, description } = data;

    if (!fromAccount || !toAccount) {
        const error = new Error("Conta de destino ou de origem não encontrada");
        error.statusCode = 400;
        throw error;
    }
    if (fromAccount.active !== true || toAccount.active !== true) {
        const error = new Error("Conta de destino ou de origem inativa");
        error.statusCode = 400;
        throw error;
    }
    if (fromAccount.blocked === true || toAccount.blocked === true) {
        const error = new Error("Conta de destino ou de origem bloqueada");
        error.statusCode = 400;
        throw error;
    }
    if (value <= 0) {
        const error = new Error("Valor menor que zero");
        error.statusCode = 400;
        throw error;
    }
    if (fromAccount === toAccount) {
        const error = new Error("Mesma conta origem e destino");
        error.statusCode = 400;
        throw error;
    }

    let balance = fromAccount.balance;

    if (fromAccount.type === "current") {
        balance += fromAccount.limit
    }

    if (value > balance) {
        const error = new Error("O valor é maior do que o disponivel");
        error.statusCode = 400;
        throw error;
    }

    const messageTranfer = {
        "message": "Transferência possivel",
        "origin": {
            "previousBalance": fromAccount.balance,
            "currentBalance": fromAccount.balance - value
        },
        "destination": {
            "previousBalance": toAccount.balance,
            "currentBalance": toAccount.balance + value
        },
        "description": description
    }

    return messageTranfer;
}

export default {
    createAccount,
    getAllAccounts,
    getAccountById,
    getAccountByAccountNumber,
    getAccountBalance,
    accountDeposit,
    accountWithdraw,
    accountWithdrawSimulate,
    accountTransfer,
    getAccountStatement,
    accountTransferSimulate
}