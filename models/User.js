import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    "nome": String,
    "email": String,
    "cpf": Number,
    "telefone": Number,
    "idade": Number,
    "ativo": Boolean
})

export default mongoose.model("User", UserSchema);