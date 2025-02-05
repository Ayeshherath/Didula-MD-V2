const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
STATUS_READ_MSG: process.env.STATUS_READ_MSG || "podda  md",
FOOTER: process.env.FOOTER || "*podda md*",
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "true",
ALIVE_IMG: process.env.ALIVE_IMG || "https://i.imgur.com/XDeIUwP.jpeg",
SESSION_ID: process.env.SESSION_ID || "6WhFzToS#olvxdmaAU625-J_m4Emhiv8A9JW8bDlE7--gnDB4OLY",
};


