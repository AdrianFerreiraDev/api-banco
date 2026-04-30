import Account from "../models/Account.js";
import User from "../models/User.js";

const createAccount = async (data) => {
    const { userId, accountNumber, agency, type, balance, limit, active, blocked } = data

    if (!userId || !accountNumber || !agency || !type || !active || !blocked) {
        const error = new Error("ID do usuario, número da conta, agencia, tipo, se está ativo e se está bloqueado são obrigatórios");
        error.statusCode = 400;
        throw error;
    }

    const userExist = await User.findOne({ _id: userId })

    if (!userExist) {
        
    }
}


export default {

}