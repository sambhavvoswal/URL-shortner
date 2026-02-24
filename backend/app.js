import express from "express";
import {nanoid} from "nanoid"
import dotenv from "dotenv"
import short_url from "./src/routes/shorturl.route.js";
import urlSchema from "./src/model/shorturl.model.js";
import connectDB from "./src/config/mango.config.js";
import { connect } from "mongoose";
import { redirectShortUrl } from "./src/controller/shorturl.controller.js";
dotenv.config("./.env");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route for /api/create
app.get("/api/create", (req, res) => {
    res.send("Use POST to create a short URL.");
});

// app.post("/api/create", short_url);
app.use("/api/create", short_url);

// Add a route to redirect short URLs and update the click count 
app.get("/:shortUrl", redirectShortUrl);

// app.use(ErrorHandler);

app.listen(3000, () => {
    connectDB();
    console.log("Port is running on http://localhost:3000");
});

//get - redirection
//post - create short url