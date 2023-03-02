import { db } from "../config/database.js"; 
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid';

export async function createAccount(req, res) {
    const {name, email, password} = req.body
    const passwordE = bcrypt.hashSync(password, 10)

    try {
        await db.query(`INSERT INTO users (name, email, password) VALUES($1, $2, $3)`, [name, email, passwordE]);
    res.sendStatus(201)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function signin(req, res) {
    const {email} = req.body
    const token = uuid()
    const obj = {token}

    try {
        await db.query(`UPDATE users SET "token" = $1 WHERE "email" = $2 `, [token, email]);
    res.status(200).send(obj)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
