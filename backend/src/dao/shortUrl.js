import ShortUrl from "../model/shorturl.model.js";
export const saveShortUrl = async (shortUrl,longUrl,userId) => {
    const newUrl = new ShortUrl({
            full_url: longUrl,
            short_url: shortUrl,
            clicks: 0,
        });
        if(userId){
            newUrl.user_id = userId;
        }
        newUrl.save();
}

// DOA -> Data Access Object 