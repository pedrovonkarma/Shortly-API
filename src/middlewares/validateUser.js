import { db } from "../config/database.js";
import userSchema from "../schemas/userSchema.js";

export async function validateUser(req, res, next){
    if(!req.body || req.body.password !== req.body.confirmPassword){
        return res.sendStatus(422)
    }
    const validation = userSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error.details)
    }
    
    try{
        const mail = await db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);
        if(mail.rows[0]){
            console.log('a')
            return res.sendStatus(409)
        }
    }catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    next()
}