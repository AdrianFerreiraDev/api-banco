import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    "userId": String,
    "numeroConta": String,
    "agencia": String,
    "tipo": String,
    "saldo": Number,
    "limite": Number,
    "ativa": Boolean,
    "bloqueada": Boolean
})

export default mongoose.model("Account", AccountSchema);