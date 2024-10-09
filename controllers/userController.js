import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ msg: "success", data: users });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (user) {
            res.status(200).json({ msg: "success", data: user });
        } else {
            res.status(404).json({ msg: "Usuario no encontrado", code: 3312 });
        }
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { name, lastname, username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            lastname,
            username,
            password: hashedPassword,
            email
        });
        const result = await newUser.save();
        res.status(201).json({ msg: "success", data: result });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedUser) {
            res.status(200).json({ msg: "success", data: updatedUser });
        } else {
            res.status(404).json({ msg: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ msg: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

// Iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        const secretKey = "clavesupersecreta";
        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser };
