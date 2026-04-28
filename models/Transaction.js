import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    "accountId": String,
    "tipo": String,
    "valor": Number,
    "saldoAnterior": Number,
    "saldoAtual": Number,
    "descricao": String,
    "status": String
})

export default mongoose.model("Transaction", TransactionSchema);