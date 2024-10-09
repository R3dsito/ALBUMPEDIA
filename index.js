import express from "express";
import dotenv from "dotenv";
import routerAPI from "./routes/index.js";
import db from "./config/db.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use( express.json());


app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});
routerAPI(app);
app.listen( port, () => { 
    console.log(`Servidor en el ${port}`)
}) ;