import express from "express";
import {nanoid} from "nanoid"
import dotenv from "dotenv"
import short_url from "./src/routes/shorturl.route.js";
import urlSchema from "./src/model/shorturl.model.js";
import connectDB from "./src/config/mango.config.js";
import { connect } from "mongoose";
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

// Add a route to redirect short URLs
app.get("/:shortUrl", async (req, res) => {
    try {
        const shortUrl = await urlSchema.findOne({ short_url: req.params.shortUrl });
        
        if (!shortUrl) {
            return res.status(404).json({ error: "URL not found" });
        }
        
        // Increment clicks
        shortUrl.clicks += 1;
        await shortUrl.save();
        
        res.redirect(shortUrl.full_url);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => {
    connectDB();
    console.log("Port is running on http://localhost:3000");
});

//get - redirection
//post - create short url