import express from "express";
import cors from 'cors';
import { createAccount, signin } from "../controllers/authControllers.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createShort, deleteUrl, getLink, openLink } from "../controllers/urlControllers.js";
import { validateDelete } from "../middlewares/validateDelete.js";
import { getRank, getUser } from "../controllers/userControllers.js";

const router = express.Router();

router.use(cors())
router.use(express.json());

router.post('/signup', validateUser, createAccount);
router.post('/signin', validateLogin, signin);
router.post('/urls/shorten', validateToken, validateSchema, createShort)

router.get('/urls/:id', getLink)
router.get('/urls/open/:shortUrl', openLink)
router.get('/users/me', validateToken, getUser)
router.get('/ranking', getRank)

router.delete('/urls/:id', validateToken, validateDelete, deleteUrl)




export default router