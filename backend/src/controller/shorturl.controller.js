import { createShortUrlWithoutUser } from "../services/shorturl.service.js";
import { createShortUrlWithUser } from "../services/shorturl.service.js";
import urlSchema from "../model/shorturl.model.js";

// Controller for creating a short URL
export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const result = await createShortUrlWithoutUser(url);
        const fullShortUrl = `${process.env.APP_URL || 'http://localhost:3000'}/${result.short_url}`;
        
        res.status(201).json({
            // short_url: result.short_url,
            // full_url: result.full_url,
            // short_url_full: fullShortUrl
            fullShortUrl
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Server error" });
    }
}


//Controller for Redirection and Count updation
export const redirectShortUrl = async (req, res) => {
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
};