import { generateNanoid } from '../utils/helper.js';
import urlSchema from '../model/shorturl.model.js';
import { saveShortUrl } from '../dao/shortUrl.js';

export const createShortUrlWithoutUser = async (url) => {
        const shortUrl = await generateNanoid(8);
        await saveShortUrl(shortUrl, url);
        return { short_url: shortUrl, full_url: url };
}

export const createShortUrlWithUser = async (url, userId) => {
        const shortUrl = await generateNanoid(8);
        await saveShortUrl(shortUrl, url, userId);
        return { short_url: shortUrl, full_url: url };
}