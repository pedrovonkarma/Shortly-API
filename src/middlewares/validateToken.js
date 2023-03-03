import { db } from "../config/database.js";

export async function validateToken(req, res, next){
    const { authorization } = req.headers;
    if(!authorization){
        return res.sendStatus(401)
    }
    const token = authorization?.replace('Bearer ', '');
    
    try{
        const mail = await db.query(`SELECT * FROM users WHERE "token" = $1`, [token]);
        if(!mail.rows[0]){
            return res.sendStatus(401)
        }
    }catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    res.locals.token = token;
    next()
}