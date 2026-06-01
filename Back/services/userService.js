import User from "../models/User.js";

const createUser = async (data) => {
    const { name, email, cpf, telephone, age, active } = data;

    const userExistsEmail = await User.findOne({ email: email });

    if (userExistsEmail) {
        const error = new Error("Já existe um usuário com esse email");
        error.statusCode = 400;
        throw error;
    }

    const userExistsCPF = await User.findOne({ cpf: cpf });

    if (userExistsCPF) {
        const error = new Error("Já existe um usuário com esse CPF");
        error.statusCode = 400;
        throw error;
    }

    return User.create({ name, email, cpf, telephone, age, active });
}

const updateMe = async (userId, data) => {
    delete data.role;
    delete data.active;
    delete data.password;

    if (data.email) {
        const emailExists = await User.findOne({
            email: data.email,
            _id: { $ne: userId },
        });

        if (emailExists) {
            const error = new Error("Já existe outro usuário com esse email");
            error.statusCode = 400;
            throw error;
        }
    }

    const user = await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
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
    updateMe,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByCPF,
    getUserByEmail
}