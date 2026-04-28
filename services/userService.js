import User from "../models/User.js";

const createUser = async (data) => {
    const { nome, email, cpf, telefone, idade, ativo } = data;

    if (!nome || !email || !cpf || !telefone || idade === undefined || ativo === undefined) {
        const error = new Error("Nome, email, CPF, telefone, idade e ativo são obrigatórios");
        error.statusCode = 400;
        throw error;
    }

    const userExistsEmail = await User.findOne({ email });

    if (userExistsEmail) {
        const error = new Error("Já existe um usuário com esse email");
        error.statusCode = 400;
        throw error;
    }

    const userExistsCPF = await User.findOne({ cpf });

    if (userExistsCPF) {
        const error = new Error("Já existe um usuário com esse CPF");
        error.statusCode = 400;
        throw error;
    }

    return User.create({ nome, email, cpf, telefone, idade, ativo });
}

const getAllUsers = async () => {
    return User.find();
}

const getUserById = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
}

const updateUser = async (data, id) => {
    const user = await User.findByIdAndUpdate(
        id,
        data
    )

    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
}

const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
}

const getUserByCPF = async (cpf) => {
    const user = await User.findOne({ cpf: cpf });

    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
}


export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByCPF,
    getUserByEmail
}