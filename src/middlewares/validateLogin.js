import { db } from "../config/database.js";
import loginSchema from "../schemas/loginSchema.js";

export async function validateLogin(req, res, next){
    const {email, password} = req.body
    if(!req.body){
        return res.sendStatus(422)
    }
    const validation = loginSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error.details)
    }
    
    try{
        const mail = await db.query(`SELECT * FROM users WHERE "email" = $1`, [email]);
        if(!mail.rows[0] || !bcrypt.compareSync(password, mail.rows[0].password)){
            return res.sendStatus(401)
        }
    }catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    next()
}