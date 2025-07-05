import express from "express";
import {nanoid} from "nanoid"
import dotenv from "dotenv"
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

app.post("/api/create", async (req, res) => {
    try {
        const {url} = req.body;
        
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        
        const shorturl = nanoid(7);
        const newUrl = new urlSchema({
            full_url: url,
            short_url: shorturl,
            clicks: 0,
        });
        
        await newUrl.save();
        
        res.status(201).json({
            message: "URL created successfully",
            short_url: shorturl,
            full_url: url
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create URL" });
    }
});

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