const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const P = require('pino');

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('./YukiSession');
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ["Yuki Bot", "Safari", "1.0"]
    });
    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (!m.message) return;
        const texto = m.message.conversation || m.message.extendedTextMessage?.text || "";
        const from = m.key.remoteJid;

        if (texto.toLowerCase() === ".menu") {
            await sock.sendMessage(from, { text: "*🌸 YUKI BOT - MENU 🌸*\n\nHola soy Yuki!\n\nComandos:\n.menú - Ver menú\n.sticker - Haz sticker\n.owner - Creador\n.ping - Velocidad" });
        }
        if (texto.toLowerCase() === ".ping") {
            await sock.sendMessage(from, { text: "Pong! 🌸 Yuki activa 10ms" });
        }
    });
    
    console.log("YUKI BOT LISTA! 🌸");
}
start();
