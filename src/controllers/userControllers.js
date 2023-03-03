import { db } from "../config/database.js"; 

export async function getUser(req, res) {
    const token = res.locals.token
    let shortenedUrls = []
    let totalVisits = 0
    try {
       const user = await db.query(`SELECT id, name FROM users WHERE "token" = $1`, [token]);
       const urls = await db.query(`SELECT * FROM links WHERE "user_id" = $1`, [user.rows[0].id]);
       for (let i = 0; i < urls.rows.length; i++) {
        let obj = {
            id: urls.rows[i].id,
            shortUrl: urls.rows[i].shorturl,
            url: urls.rows[i].url,
            visitCount: urls.rows[i].visits
        }
        totalVisits += urls.rows[i].visits
        shortenedUrls.push(obj)
       }
       const obj2 = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        visitCount: totalVisits,
        shortenedUrls: shortenedUrls
       }
        res.status(200).send(obj2)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getRank(req, res) {
    
    try {
       const rank = await db.query(`
       SELECT
         users.id,
         users.name,
         COUNT(links.id) AS "linksCount",
         SUM(links.visits) AS "visitCount"
       FROM
         users
         JOIN links ON users.id = links.user_id
       GROUP BY
         users.id
       ORDER BY
         "visitCount" DESC
       LIMIT
         10;
       `);
       
        res.status(200).send(rank.rows)
    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
