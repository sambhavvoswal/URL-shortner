import { generateNanoid } from '../utils/helper.js';
import urlSchema from '../model/shorturl.model.js';

export const createShortUrlService = async (url) => {
    if (!url) {
        throw new Error("URL is required");
    }

    try {
        const shortUrl = generateNanoid(8);
        const newUrl = new urlSchema({
            full_url: url,
            short_url: shortUrl,
            clicks: 0,
        });

        await newUrl.save();
        return { short_url: shortUrl, full_url: url };
    } catch (error) {
        console.error(error);
        throw new Error("Server error");
    }
}