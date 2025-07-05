import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true,
        index: true, // This will create an index on the short_url field for faster lookups
        unique: true, // Ensure that each short URL is unique
    },
    clicks: {
        type:Number,
        required: true,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;

// {
//   "url": "https://example.com"
// }

// app.get("/api/create", (req, res) => {
//     res.send("Use POST to create a short URL.");
// });
