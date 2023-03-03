import { db } from "../config/database.js";

export async function validateDelete(req, res, next){
    const token = res.locals.token
    const {id} = req.params
    try{
        const user = await db.query(`SELECT id FROM users WHERE "token" = $1`, [token]);
        const url = await db.query(`SELECT user_id FROM links WHERE "id" = $1`, [id]);
        if(!url.rows[0]){
            return res.sendStatus(404)
        }
        if(url.rows[0].user_id !== user.rows[0].id){
            return res.sendStatus(401)
        }
    }catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    next()
}