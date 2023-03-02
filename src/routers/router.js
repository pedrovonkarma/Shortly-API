import express from "express";
import cors from 'cors';
import { createAccount, signin } from "../controllers/authControllers.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const router = express.Router();

router.use(cors())
router.use(express.json());

router.post('/signup', validateUser, createAccount);
router.post('/signin', validateLogin, signin)


export default router