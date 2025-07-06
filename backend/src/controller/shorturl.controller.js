import { createShortUrlService } from "../services/shorturl.service.js";

export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const result = await createShortUrlService(url);
        const fullShortUrl = `${process.env.APP_URL || 'http://localhost:3000'}/${result.short_url}`;
        
        res.status(201).json({
            short_url: result.short_url,
            full_url: result.full_url,
            short_url_full: fullShortUrl
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Server error" });
    }
}