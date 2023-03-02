import { db } from "../config/database.js"; 

export async function listCustomers(req, res) {
    try {
        const clientes = await db.query(`SELECT * FROM customers`);
    res.send(clientes.rows)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function listCustomer(req, res) {
    const {id} = req.params
    try {
        const cliente = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if(!cliente.rows[0]){
return res.sendStatus(404)
        }
    res.send(cliente.rows[0])
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function createCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body
    
    try {
        let id = await db.query(`SELECT * FROM customers`)
        id = id.rows.length +1
    await db.query(`INSERT INTO customers VALUES ($1, $2, $3, $4, $5)`, [id, name, phone, cpf, birthday]);
    res.sendStatus(201)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function updateCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body
    const {id} = req.params
    
    try {
    await db.query('UPDATE customers SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4 WHERE "id" = $5', [name, phone, cpf, birthday, id]);
    res.sendStatus(200)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}