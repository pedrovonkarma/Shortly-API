import { db } from "../config/database.js";
import customerSchema from "../schemas/customerSchema.js";

export async function validateUpCustomer(req, res, next){
    const {id} = req.params
    if(!req.body){
        return res.sendStatus(200)
    }
    const validation = customerSchema.validate(req.body)
    if (validation.error) {
        return res.status(400).send(validation.error.details)
    }
    try{
        const cpf = await db.query(`SELECT * FROM customers WHERE cpf = $1 AND id != $2`, [req.body.cpf, id]);
        if(cpf.rows[0]){
            return res.sendStatus(409)
        }
    }catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    next()
}