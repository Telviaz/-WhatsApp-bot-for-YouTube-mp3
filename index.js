const fs = require('fs');
const qrcode = require('qrcode-terminal');
const moment = require('moment-timezone');
const colors = require('colors');
const { Client } = require('whatsapp-web.js');
const { exec } = require('child_process');
const ytdl = require('ytdl-core');
require('dotenv').config();

// Initialize the WhatsApp client
const client = new Client({
  session: JSON.parse(fs.readFileSync('./session.json', 'utf8')),
});

// Helper function to format the current time
function formatTime() {
  return moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
}

// Helper function to download a YouTube video as an mp3 file
function downloadVideo(url, callback) {
  const video = ytdl(url, { filter: 'audioonly' });
  const fileName = `${Date.now()}.mp3`;
  const filePath = `./${fileName}`;
  video.pipe(fs.createWriteStream(filePath));
  video.on('end', () => callback(filePath));
}

// Listen for incoming messages
client.on('message', async (message) => {
  console.log(`[${formatTime()}] Received message from ${message.from}: ${message.body}`);
  if (message.body.startsWith('!youtube ')) {
    const url = message.body.substring(9);
    console.log(`[${formatTime()}] Downloading YouTube video: ${url}`);
    message.reply('🔍 Searching for video...');
    downloadVideo(url, (filePath) => {
      console.log(`[${formatTime()}] Uploading file: ${filePath}`);
      client.sendMessage(message.from, {
        url: filePath,
        filename: `${Date.now()}.mp3`,
      });
    });
  }
});

// Log in to WhatsApp
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log(`[${formatTime()}] WhatsApp client is ready`);
});

client.initialize();
