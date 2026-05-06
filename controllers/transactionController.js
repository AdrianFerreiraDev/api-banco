import transactionService from "../services/transactionService.js";

const getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.json(transactions);
    } catch (error) {
        next(error);
    }
}


export default {
    getAllTransactions,
}