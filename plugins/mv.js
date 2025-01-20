
const { cmd } = require('../command');
const axios = require('axios');

// Command to search for movies
cmd({
    pattern: "movie",
    desc: "Search for movies",
    use: ".movie <movie_name>",
    react: "🎬",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply('Please provide a movie title!');

    try {
        const response = await axios.get(`https://vajira-movie-api.vercel.app/api/cinesubz/search?q=${encodeURIComponent(q)}&apikey=vajiratech`);
        const movies = response.data.data.data;

        if (!movies || movies.length === 0) return reply('No movies found!');

        let message = `🎥 *Movie Search Results* 🎥\n`;
        movies.forEach((movie, index) => {
            message += `\n${index + 1}. *${movie.title}*\n   Year: ${movie.year}\n   Rating: ${movie.rating}\n   [More Info](${movie.link})\n`;
        });
        message += `\n\nReply with the movie number to download.`;

        const sentMsg = await conn.sendMessage(from, { text: message }, { quoted: mek });

        const searchResponseHandler = async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = parseInt(msg.message.extendedTextMessage.text.trim(), 10) - 1;

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {
                if (selectedOption >= 0 && selectedOption < movies.length) {
                    const movieLink = movies[selectedOption].link;

                    // Fetch movie download links
                    try {
                        const downloadResponse = await axios.get(`https://vajira-movie-api.vercel.app/api/cinesubz/download?url=${encodeURIComponent(movieLink)}&apikey=vajiratech`);
                        const downloadLinks = downloadResponse.data.data;

                        let downloadMessage = `🎬 *${movies[selectedOption].title}* - Download Links\n\n`;
                        downloadLinks.forEach(link => {
                            downloadMessage += `- ${link.fileName} (${link.fileSize}): [Download](${link.href})\n`;
                        });

                        await conn.sendMessage(from, { text: downloadMessage }, { quoted: mek });
                    } catch (downloadError) {
                        console.error(downloadError);
                        reply('An error occurred while fetching download links. Please try again later.');
                    }

                } else {
                    reply('Invalid option. Please select a valid movie number.🔴');
                }
                conn.ev.off('messages.upsert', searchResponseHandler);
            }
        };

        conn.ev.on('messages.upsert', searchResponseHandler);

    } catch (error) {
        console.error(error);
        reply('An error occurred while searching for movies. Please try again later.');
    }
});