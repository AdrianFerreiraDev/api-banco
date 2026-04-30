import accountService from "../services/accountService.js";

const createAccount = async (req, res, next) => {
    try {
        const account = await accountService.createAccount(req.body);
        res.status(201).json(account)
    } catch (error) {
        next(error);
    }
}


export default {
    createAccount
}