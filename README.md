<p align="center">
  <img src="https://files.catbox.moe/f8tj1b.png" alt="Rimuru Bot" width="150"/>
</p>

<h1 align="center">💧 Rimuru Baileys</h1>
<p align="center">TypeScript-based library for WhatsApp Web API integration, with built-in fixes for group identifiers like @lid and @jid.
</p>

<p align="center">
  <a href="https://github.com/ryuhandev/rimuru-baileys/stargazers"><img src="https://img.shields.io/github/stars/ryuhandev/rimuru-baileys?style=flat-square&logo=github" alt="GitHub Stars"/></a>
  <a href="https://github.com/ryuhandev/rimuru-baileys/issues"><img src="https://img.shields.io/github/issues/ryuhandev/rimuru-baileys?style=flat-square&logo=github" alt="GitHub Issues"/></a>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
</p>

---

## ✨ Features

- **💧 Intelligent `@lid` and `@jid` mapping**
- **💧 Multi-device support**
- **💧 End-to-End Encryption support**
- **💧 Handles all WhatsApp message types**
- **💧 Fast and modern TypeScript codebase**
- **💧 Multi-Device Support:** Works with latest WhatsApp multi-device protocol.
- **💧 Media Handling:** Send and receive images, videos, audio, stickers, and documents.  
- **💧 Pairing Code Login:** Easy login using Pairing Code.  
- **💧 Simple & Extendable:** Clean code structure for customization and adding new features.
- **💧 Support Botton Message:** You can add cool botton to your bot menu
- **💧 High Compatibility:** Built on Ryuhan's fork of Baileys for reliable WhatsApp API integration.

---
### 💧 Installation

```bash
npm install @ryuhan/baileys
# or
yarn add @ryuhan/baileys
```

### 💧 Quick Example

```ts
import makeWASocket from '@ryuhan/baileys'
import { getSenderLid, toJid } from '@ryuhan/baileys'

const sock = makeWASocket({ printQRInTerminal: true })

sock.ev.on('messages.upsert', ({ messages }) => {
    const msg = messages[0]
    const info = getSenderLid(msg) // logs the sender LID
    const jid = toJid(info.lid)
    console.log('normalized jid:', jid)
})
```

### 💧 Advanced Usage (Multi-file Auth)

```ts
import makeWASocket, { useMultiFileAuthState } from "@ryuhan/baileys"

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info")
    const sock = makeWASocket({ auth: state, printQRInTerminal: true })

    sock.ev.on("creds.update", saveCreds)
    sock.ev.on("messages.upsert", ({ messages }) => {
        for (const m of messages) {
            console.log(m.key.remoteJid, m.message?.conversation)
        }
    })
}

start()
```
---

### 💧 EXAMPLE PACKAGE FOR PAIRING CODE BOT:

```
{
  "name": "your-bot-name",
  "version": "1.1.0",
  "description": "Just Example",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Someone",
  "license": "MIT",
  "dependencies": {
    "@whiskeysockets/baileys": "npm:@ryuhan/baileys",
    "@whiskeysockets/keyed-db": "^0.2.4",
    "awesome-phonenumber": "^2.64.0",
    "chalk": "^4.1.2",
    "cheerio": "^1.0.0-rc.10",
    "didyoumean": "^1.2.2",
    "fetch": "^1.1.0",
    "figlet": "^1.5.2",
    "file-type": "^16.5.3",
    "fluent-ffmpeg": "^2.1.3",
    "form-data": "*",
    "fs-extra": "11.2.0",
    "human-readable": "^0.2.1",
    "jimp": "^0.16.1",
    "moment-timezone": "^0.5.34",
    "node-cache": "^5.1.2",
    "node-fetch": "^2.6.1",
    "node-id3": "^0.2.3",
    "node-webpmux": "^3.1.1",
    "performance-now": "^2.1.0",
    "pino": "^7.0.5",
    "qrcode-terminal": "^0.12.0",
    "sharp": "^0.34.1",
    "similarity": "^1.2.1",
    "util": "^0.12.4"
  }
}
```
⚠️ ***JIKA TERJADI ERROR SAAT GENERATE PAIRING CODE PASTIKAN ANDA MENGGUNAKAN REQUIRE BAILEYS "whiskeysockets" JANGAN "adiwajshing
---
