import express from "express";
import router from "./routers/router.js";


const app = express()

app.use(router)
const port = process.env.PORT || 5000;
app.listen(port)