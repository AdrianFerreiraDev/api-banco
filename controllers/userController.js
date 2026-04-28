import userService from "../services/userService.js";

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUser(req.body, req.params.id);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        next(error);
    }
}

const getUserByCPF = async (req, res, next) => {
    try {
        const user = await userService.getUserByCPF(req.params.cpf);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const getUserByEmail = async (req, res, next) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        res.json(user);
    } catch (error) {
        next(error);
    }
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