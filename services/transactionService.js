import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const getAllTransactions = async () => {
    return Transaction.find();
}

const getTransactionById = async (id) => {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
        const error = new Error("Transação não encontrada");
        error.statusCode = 400;
        throw error;
    }

    return transaction;
}

const getTransactionByType = async (type) => {
    const transaction = await Transaction.find({ type: type });

    if (!transaction) {
        const error = new Error("Transação não encontrada");
        error.statusCode = 400;
        throw error;
    }

    return transaction;
}

const getTransactionByValue = async (min, max) => {
    min = Number(min);
    max = Number(max);

    if (min === isNaN || max === isNaN) {
        const error = new Error("Os valores precisam ser numeros");
        error.statusCode = 400;
        throw error;
    }

    const transaction = await Transaction.find({
        value: {
            $gte: min,
            $lte: max
        }
    })


    if (!transaction) {
        const error = new Error("Transação não encontrada");
        error.statusCode = 400;
        throw error;
    }

    return transaction;
}

const getTransactionByYear = async (year) => {
    year = Number(year);

    if (year === isNaN) {
        const error = new Error("O ano precisa ser numero");
        error.statusCode = 400;
        throw error;
    }

    const transaction = await Transaction.find({
        createdAt: {
            $gte: new Date(`${year}-01-01T00:00:00Z`),
            $lt: new Date(`${year + 1}-01-01T00:00:00Z`)
        }
    });

    if (!transaction) {
        const error = new Error("Transação não encontrada");
        error.statusCode = 400;
        throw error;
    }

    return transaction;
}


export default {
    getAllTransactions,
    getTransactionById,
    getTransactionByType,
    getTransactionByValue,
    getTransactionByYear
}