import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (data) => {
    const {name, email, cpf, password, telephone, role, age, active} = data;

    if (!name || !email || !cpf || !password || !telephone || !age) {
        throw new Error("Nome, email, CPF, senha, telefone e idade são obrigatórios");
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        throw new Error("Já existe um usuário com este email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        cpf,
        password: hashedPassword,
        telephone,
        role: role || "user",
        age,
        active: active || true
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        telephone: user.telephone,
        role: user.role,
        active: user.active,
    };
}

const login = async (data) => {
    const { email, password } = data;
    
    if (!email || !password) {
        throw new Error("Email e senha são obrigatórios");
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        throw new Error("Email ou senha inválidos");
    }

    if (!user.active) {
        throw new Error("Usuário inativo");
    }
    
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
        throw new Error("Senha inválida")
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    )

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            telephone: user.telephone,
            role: user.role,
            active: user.active,
        },
        token,
    };
}

export default {
    register,
    login
}