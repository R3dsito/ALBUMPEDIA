import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from "../controllers/userController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const auth = (req, res, next) => {
    const headersToken = req.headers.authorization;

    if (headersToken) {
        const token = headersToken.split(" ")[1];
        const secretKey = "clavesupersecreta";

        jwt.verify(token, secretKey, (err, payload) => {
            if (err) {
                console.log(err);
                return res.status(403).json({ message: "Token no válido" });
            }
            console.log(payload);
            req.user = payload;
            next();
        });
    } else {
        res.status(401).json({ message: "Token no proporcionado" });
    }
};

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.post('/', createUser);
router.post('/login', loginUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;