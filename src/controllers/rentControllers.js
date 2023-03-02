import { db } from "../config/database.js"; 
import dayjs from "dayjs";

export async function listRents(req, res) {
    try {
        let rents = await db.query(`SELECT * FROM rentals`);
        rents = rents.rows
        for(let i = 0; i<rents.length; i++){
            const customerName = await db.query(`SELECT name FROM customers WHERE id = $1`, [rents[i].customerId]);
            const gameName = await db.query(`SELECT name FROM games WHERE id = $1`, [rents[i].gameId]);
            rents[i] = {...rents[i], customer: {id: rents[i].customerId, name: customerName.rows[0].name}, game: {id: rents[i].gameId, name: gameName.rows[0].name}}
        }
    res.send(rents)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function createRent(req, res) {
    const {customerId, gameId, daysRented } = req.body
    const rentDate = dayjs().format('YYYY-MM-DD')
    const returnDate = null
    const delayFee = null
    try {
        let id = await db.query(`SELECT * FROM rentals`)
        id = id.rows.length +1
        
        let pricePerDay = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId])
        
    const originalPrice = daysRented*(pricePerDay.rows[0].pricePerDay)
    await db.query(`INSERT INTO rentals VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);
    res.sendStatus(201)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function updateRent(req, res) {
    const {id} = req.params
    
    const returnDate = dayjs().format('YYYY-MM-DD')
    try {
    const rent = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
    if(!rent.rows[0]){
        return res.sendStatus(404)
    }
    if(rent.rows[0].returnDate){
        return res.sendStatus(400)
    }
    const expirationDate = dayjs(rent.rows[0].rentDate).add(rent.rows[0].daysRented, 'day');
    const difference = dayjs().diff(expirationDate, 'day');
    let delayFee
    if (difference > 0){ 
        delayFee = difference * (rent.rows[0].originalPrice / rent.rows[0].daysRented);
    } else{
        delayFee = null
    }

    await db.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE "id" = $3', [returnDate, delayFee, id]);

    res.sendStatus(200)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function deleteRent(req, res) {
    const {id} = req.params
    
    try {
       const rent = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
       if(!rent.rows[0]){
        return res.sendStatus(404)
       }
       if(rent.rows[0].returnDate === null){
        return res.sendStatus(400)
       }
       await db.query(`DELETE FROM rentals WHERE "id" = $1`, [id])
       res.sendStatus(200)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}