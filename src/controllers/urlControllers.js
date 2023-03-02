import { db } from "../config/database.js"; 
import { nanoid } from 'nanoid'

export async function createShort(req, res) {
    const {url} = req.body
    const shortUrl = nanoid(8)

    try {
       let id = await db.query(`SELECT * FROM links`);
       id = id.rows.length +1
       await db.query(`INSERT INTO links (url, shorturl) VALUES($1, $2)`, [url, shortUrl]);
       const obj = {id, shortUrl}
    res.status(201).send(obj)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getLink(req, res) {
    const {id} = req.params

    try {
       let obj = await db.query(`SELECT id, url, shorturl FROM links WHERE "id" = $1`, [id]);
       if(!obj.rows[0]){
        return res.sendStatus(404)
    }
    const obj2 = {id: obj.rows[0].id, url:obj.rows[0].url, shortUrl:obj.rows[0].shorturl}
    res.status(200).send(obj2)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function openLink(req, res) {
    const {shortUrl} = req.params

    try {
       let link = await db.query(`SELECT url, visits FROM links WHERE "shorturl" = $1`, [shortUrl]);
       if(!link.rows[0]){
        return res.sendStatus(404)
    }
    await db.query(`UPDATE links SET "visits" = $1 WHERE "shorturl" = $2`, [link.rows[0].visits+1, shortUrl])

    res.redirect(link.rows[0].url)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}