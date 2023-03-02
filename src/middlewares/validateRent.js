import { db } from "../config/database.js";
import rentSchema from "../schemas/rentSchema.js";

export async function validateRent(req, res, next){
    if(!req.body){
        return res.sendStatus(201)
    }
    const validation = rentSchema.validate(req.body)
    if (validation.error) {
        return res.status(400).send(validation.error.details)
    }
    try{
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [req.body.customerId]);
        const game = await db.query(`SELECT * FROM games WHERE id = $1`, [req.body.gameId]);

        if(!customer.rows[0] || !game.rows[0]){
            return res.sendStatus(400)
        }
        const totalRents = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [req.body.gameId]);
        if(totalRents.rowCount>=game.rows[0].stockTotal){
            return res.sendStatus(400)
        }
    }catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    next()
}