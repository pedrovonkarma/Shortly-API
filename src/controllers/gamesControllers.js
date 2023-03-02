import { db } from "../config/database.js"; 

export async function listGames(req, res) {
    try {
        const jogos = await db.query(`SELECT * FROM games`);
    res.send(jogos.rows)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function createGame(req, res) {
    const {name, image, stockTotal, pricePerDay} = req.body
    
    try {
        let id = await db.query(`SELECT * FROM games`)
        id = id.rows.length +1
    await db.query(`INSERT INTO games VALUES ($1, $2, $3, $4, $5)`, [id, name, image, stockTotal, pricePerDay]);
    res.sendStatus(201)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
