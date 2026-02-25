import React, { useState } from 'react';
import axios from 'axios';

const FormHandler = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setShortUrl("");
        try {
            const response = await axios.post("http://localhost:3000/api/create", { url });
            if (response.data.fullShortUrl) {
            setShortUrl(response.data.fullShortUrl);
            } else {
            setError(response.data.message || "Failed to shorten URL.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Network error.");
        } finally {
            setLoading(false);
        }
};


    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            setError("Failed to copy URL.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">URL Shortener</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="url"
                        placeholder="Enter your URL"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        required
                        className="p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-400 hover:shadow-md transition"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 transition-all duration-200"
                    >
                        {loading ? "Shortening..." : "Shorten URL"}
                    </button>
                </form>
                {shortUrl && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition">
                        <p className="text-sm text-gray-600 mb-2">Short URL:</p>
                        <div className="flex items-center gap-2 justify-between">
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline truncate font-medium hover:text-blue-800 hover:scale-105 transition">
                                {shortUrl}
                            </a>
                            <button
                                onClick={handleCopy}
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-110 hover:shadow-lg text-sm font-semibold transition-all duration-200"
                            >
                                {copied ? "✓ Copied!" : "Copy"}
                            </button>
                        </div>
                        {copied && <p className="text-green-600 text-sm mt-2 font-medium animate-pulse">Copied to clipboard!</p>}
                    </div>
                )}
                {error && (
                    <div className="text-red-600 mt-4 p-3 bg-red-50 rounded-lg border border-red-200 text-center hover:bg-red-100 hover:border-red-300 hover:shadow-md transition">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FormHandler