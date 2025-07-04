import express from "express";
const app = express();
dotenv.config("./.env");
import {nanoid} from "nanoid"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", (req, res) => {
    const {url} = req.body
    console.log(url);
    res.send(nanoid(7))
});

app.listen(3000, () => {
    console.log("Port is running on http://localhost:3000");
});

//get - redirection
//post - create short url