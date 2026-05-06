import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const getAllTransactions = async () => {
    return Transaction.find();
}


export default {
    getAllTransactions,
}