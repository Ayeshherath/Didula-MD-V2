
const { cmd } = require('../command'); // Ensure the path is correct

cmd({
    pattern: "ping",
    alias: ["pong"],
    react: "🏓",
    desc: "Check the bot's responsiveness",
    category: "utility",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
    const vajiralod = [
        "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
        "《 ████▒▒▒▒▒▒▒▒》30%",
        "《 ███████▒▒▒▒▒》50%",
        "《 ██████████▒▒》80%",
        "《 ████████████》100%",
        "𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 💚..."
    ];
    
    const start = Date.now();
    await reply("𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐒𝐩𝐞𝐞𝐝💚"); // Inform the user that the ping is in progress

    // Send initial upload message
    let { key } = await conn.sendMessage(from, { text: 'ᴜᴘʟᴏᴀᴅɪɴɡ ᴍᴏᴠɪᴇ...' });

    // Loop through the loading messages
    for (let i = 0; i < vajiralod.length; i++) {
        await conn.sendMessage(from, { text: vajiralod[i], edit: key });
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for half a second for the next message
    }

    const end = Date.now();
    const latency = end - start; // Calculate the latency
    await reply(`𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐒𝐩𝐞𝐞𝐝 💚: ${latency}𝐦𝐬`);
});
