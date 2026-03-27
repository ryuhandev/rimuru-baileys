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
  "name": "your-bot",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@whiskeysockets/baileys": "npm:@ryuhan/baileys",
    "archiver": "^7.0.1",
    "awesome-phonenumber": "^7.6.0",
    "@hapi/boom": "^10.0.1",
    "readline": "^1.3.0",
    "pino": "^9.5.0",
    "@napi-rs/canvas": "^0.1.84",
    "chalk": "^5.3.0",
    "fs-extra": "^11.2.0",
    "node-cache": "^5.1.2",
    "file-type": "^19.6.0",
    "axios": "^1.7.9",
    "node-fetch": "^3.3.2",
    "jimp": "^0.16.13"
  }
}
```
---
