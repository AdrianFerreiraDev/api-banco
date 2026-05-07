import transactionService from "../services/transactionService.js";

const getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.json(transactions);
    } catch (error) {
        next(error);
    }
}

const getTransactionById = async (req, res, next) => {
    try {
        const transaction = await transactionService.getTransactionById( req.params.id );
        res.json(transaction);
    } catch (error) {
        next(error);
    }
}

const getTransactionByType = async (req, res, next) => {
    try {
        const transaction = await transactionService.getTransactionByType( req.params.type );
        res.json(transaction);
    } catch (error) {
        next(error);
    }
}

const getTransactionByValue = async (req, res, next) => {
    try {
        const transaction = await transactionService.getTransactionByValue( req.params.min, req.params.max)
        res.json(transaction)
    } catch (error) {
        next(error)
    }
}

const getTransactionByYear = async (req, res, next) => {
    try {
        const transaction = await transactionService.getTransactionByYear( req.params.year );
        res.json(transaction);
    } catch (error) {
        next(error);
    }
}


export default {
    getAllTransactions,
    getTransactionById,
    getTransactionByType,
    getTransactionByValue,
    getTransactionByYear
}