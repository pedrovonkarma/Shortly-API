
import gameSchema from "../schemas/gameSchema.js";
import { db } from "../config/database.js";

export async function validateGame(req, res, next){
    if(!req.body){
        return res.sendStatus(201)
    }
    const validation = gameSchema.validate(req.body)
    if (validation.error) {
        return res.status(400).send(validation.error.details)
    }
    try{
        const game = await db.query(`SELECT * FROM games WHERE name = $1`, [req.body.name]);
        if(game.rows[0]){
            return res.sendStatus(409)
        }
    }catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    next();
}
