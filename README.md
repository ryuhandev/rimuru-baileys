<p align="center">
  <img src="https://files.catbox.moe/f8tj1b.png" alt="Rimuru Bot" width="150"/>
</p>

<h1 align="center">💧 Rimuru Baileys</h1>
<p align="center">
  <strong>TypeScript-based WhatsApp Multi-Device Library</strong><br/>
  With intelligent @lid/@jid mapping and advanced message handling
</p>

<p align="center">
  <a href="https://github.com/ryuhandev/rimuru-baileys/stargazers"><img src="https://img.shields.io/github/stars/ryuhandev/rimuru-baileys?style=flat-square&logo=github" alt="GitHub Stars"/></a>
  <a href="https://github.com/ryuhandev/rimuru-baileys/issues"><img src="https://img.shields.io/github/issues/ryuhandev/rimuru-baileys?style=flat-square&logo=github" alt="GitHub Issues"/></a>
  <a href="https://www.npmjs.com/package/@ryuhan/baileys"><img src="https://img.shields.io/npm/v/@ryuhan/baileys?style=flat-square&logo=npm" alt="npm Version"/></a>
  <a href="https://www.npmjs.com/package/@ryuhan/baileys"><img src="https://img.shields.io/npm/dt/@ryuhan/baileys?style=flat-square&logo=npm" alt="npm Downloads"/></a>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
</p>

---

## 🌟 Features

### Core Features
- **💧 Intelligent `@lid` and `@jid` Mapping** - Automatic resolution of LID to phone JID
- **💧 Multi-Device Support** - Full support for WhatsApp multi-device protocol
- **💧 End-to-End Encryption** - Complete E2EE support for secure messaging
- **💧 All Message Types** - Support for text, media, polls, reactions, and more
- **💧 TypeScript Based** - Type-safe with modern TypeScript
- **💧 High Performance** - Optimized for speed and efficiency

### Advanced Features
- **💧 Media Handling** - Send/receive images, videos, audio, stickers, documents
- **💧 Pairing Code Login** - Easy authentication with custom pairing code "MURUSAMA"
- **💧 Newsletter/Channel Support** - Full support for WhatsApp channels
- **💧 Group Management** - Complete group controls and administration
- **💧 Story/Broadcast** - Send and manage stories and broadcast lists
- **💧 Business API** - Support for WhatsApp Business features
- **💧 Poll Messages** - Create and manage poll messages with vote tracking
- **💧 Reaction Messages** - Send and receive emoji reactions
- **💧 Pin Messages** - Pin important messages in chats
- **💧 Disappearing Messages** - Configure ephemeral messages
- **💧 Contact Messages** - Send vCard contacts
- **💧 Location Messages** - Share live and static locations
- **💧 Button Messages** - Interactive button messages (where supported)
- **💧 List Messages** - Interactive list messages
- **💧 Template Messages** - Pre-defined message templates

### Developer Friendly
- **💧 Clean API** - Simple and intuitive API design
- **💧 Event-Driven** - Comprehensive event system for all actions
- **💧 Auth Storage** - Multi-file and single-file auth state options
- **💧 In-Memory Store** - Built-in store for chats, contacts, messages
- **💧 Customizable** - Easy to extend and customize
- **💧 Well Documented** - Comprehensive documentation and examples

---

## 📦 Installation

### npm
```bash
npm install @ryuhan/baileys
```

### yarn
```bash
yarn add @ryuhan/baileys
```

### pnpm
```bash
pnpm add @ryuhan/baileys
```

---

## 🚀 Quick Start

### Basic Example
```typescript
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@ryuhan/baileys'
import { Boom } from '@hapi/boom'

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            if (shouldReconnect) {
                connectToWhatsApp()
            }
        } else if (connection === 'open') {
            console.log('✅ Connected to WhatsApp!')
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        for (const m of messages) {
            if (!m.message) continue
            console.log('📱 New message:', m.key.remoteJid)
            
            // Reply to message
            await sock.sendMessage(m.key.remoteJid!, { 
                text: 'Hello! I am Rimuru Bot 💧' 
            })
        }
    })

    sock.ev.on('creds.update', saveCreds)
}

connectToWhatsApp()
```

---

## 🔐 Authentication

### Pairing Code (Recommended)
```typescript
import makeWASocket from '@ryuhan/baileys'

const sock = makeWASocket({
    printQRInTerminal: false
})

// Request pairing code
if (!sock.authState.creds.registered) {
    const phoneNumber = '6285134816783' // Your phone number with country code
    const code = await sock.requestPairingCode(phoneNumber, "MURUSAMA")
    console.log('💧 Pairing Code:', code)
}
```

### QR Code
```typescript
import makeWASocket, { Browsers } from '@ryuhan/baileys'

const sock = makeWASocket({
    browser: Browsers.ubuntu('My Bot'),
    printQRInTerminal: true
})
```

---

## 📚 Common Use Cases

### Send Text Message
```typescript
await sock.sendMessage(jid, { text: 'Hello World! 💧' })
```

### Send Image
```typescript
await sock.sendMessage(jid, {
    image: { url: './image.jpg' },
    caption: 'Check this out!'
})
```

### Send Video
```typescript
await sock.sendMessage(jid, {
    video: { url: './video.mp4' },
    caption: 'Amazing video!',
    mimetype: 'video/mp4'
})
```

### Send Audio
```typescript
await sock.sendMessage(jid, {
    audio: { url: './audio.mp3' },
    mimetype: 'audio/mp4'
})
```

### Send Sticker
```typescript
await sock.sendMessage(jid, {
    sticker: { url: './sticker.webp' }
})
```

### Send Document
```typescript
await sock.sendMessage(jid, {
    document: { url: './document.pdf' },
    mimetype: 'application/pdf',
    fileName: 'document.pdf'
})
```

### Send Location
```typescript
await sock.sendMessage(jid, {
    location: {
        degreesLatitude: -6.2088,
        degreesLongitude: 106.8456
    }
})
```

### Send Contact
```typescript
const vcard = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL;type=CELL;type=VOICE;waid=6281234567890:+62 812-3456-7890
END:VCARD`

await sock.sendMessage(jid, {
    contacts: {
        displayName: 'John Doe',
        contacts: [{ vcard }]
    }
})
```

### Send Poll
```typescript
await sock.sendMessage(jid, {
    poll: {
        name: 'Favorite Color?',
        values: ['Red', 'Blue', 'Green'],
        selectableCount: 1
    }
})
```

### Send Reaction
```typescript
await sock.sendMessage(jid, {
    react: {
        text: '💧',
        key: message.key
    }
})
```

### Reply/Quote Message
```typescript
await sock.sendMessage(jid, {
    text: 'This is a reply'
}, {
    quoted: message
})
```

### Mention Users
```typescript
await sock.sendMessage(jid, {
    text: 'Hello @6281234567890!',
    mentions: ['6281234567890@s.whatsapp.net']
})
```

### Forward Message
```typescript
await sock.sendMessage(jid, {
    forward: message
})
```

### Delete Message (For Everyone)
```typescript
const msg = await sock.sendMessage(jid, { text: 'test' })
await sock.sendMessage(jid, { delete: msg.key })
```

### Edit Message
```typescript
await sock.sendMessage(jid, {
    text: 'Updated text',
    edit: message.key
})
```

### Pin Message
```typescript
await sock.sendMessage(jid, {
    pin: {
        type: 1, // 1=24h, 2=7d, 3=30d
        time: 86400,
        key: message.key
    }
})
```

### View Once Message
```typescript
await sock.sendMessage(jid, {
    image: { url: './image.jpg' },
    viewOnce: true
})
```

---

## 👥 Group Management

### Create Group
```typescript
const group = await sock.groupCreate('My Group', ['6281234567890@s.whatsapp.net'])
console.log('Group created:', group.id)
```

### Add Participants
```typescript
await sock.groupParticipantsUpdate(groupId, ['6281234567890@s.whatsapp.net'], 'add')
```

### Remove Participants
```typescript
await sock.groupParticipantsUpdate(groupId, ['6281234567890@s.whatsapp.net'], 'remove')
```

### Promote to Admin
```typescript
await sock.groupParticipantsUpdate(groupId, ['6281234567890@s.whatsapp.net'], 'promote')
```

### Demote Admin
```typescript
await sock.groupParticipantsUpdate(groupId, ['6281234567890@s.whatsapp.net'], 'demote')
```

### Update Group Name
```typescript
await sock.groupUpdateSubject(groupId, 'New Group Name')
```

### Update Group Description
```typescript
await sock.groupUpdateDescription(groupId, 'New Description')
```

### Get Invite Code
```typescript
const code = await sock.groupInviteCode(groupId)
const inviteLink = 'https://chat.whatsapp.com/' + code
```

### Join Group
```typescript
await sock.groupAcceptInvite('inviteCode')
```

### Leave Group
```typescript
await sock.groupLeave(groupId)
```

---

## 📞 Call Handling

### Reject Call
```typescript
sock.ev.on('call', async (calls) => {
    for (const call of calls) {
        await sock.rejectCall(call.id, call.from)
    }
})
```

---

## 👤 User Operations

### Check If Number Exists on WhatsApp
```typescript
const [result] = await sock.onWhatsApp('6281234567890')
if (result?.exists) {
    console.log('Number exists:', result.jid)
}
```

### Get Profile Picture
```typescript
// Low resolution
const ppUrl = await sock.profilePictureUrl(jid)

// High resolution
const ppUrl = await sock.profilePictureUrl(jid, 'image')
```

### Get Status
```typescript
const status = await sock.fetchStatus(jid)
console.log('About:', status?.status)
```

### Get Business Profile
```typescript
const profile = await sock.getBusinessProfile(jid)
console.log('Business:', profile)
```

---

## 📝 Chat Operations

### Archive Chat
```typescript
const lastMsg = await getLastMessage(jid)
await sock.chatModify({ archive: true, lastMessages: [lastMsg] }, jid)
```

### Mute Chat
```typescript
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid) // 8 hours
```

### Unmute Chat
```typescript
await sock.chatModify({ mute: null }, jid)
```

### Mark as Read
```typescript
await sock.readMessages([message.key])
```

### Delete Chat
```typescript
await sock.chatModify({ delete: true, lastMessages: [lastMsg] }, jid)
```

### Star Message
```typescript
await sock.chatModify({
    star: {
        messages: [{ id: 'messageID', fromMe: true }],
        star: true
    }
}, jid)
```

### Disappearing Messages
```typescript
// Enable
await sock.sendMessage(jid, {
    disappearingMessagesInChat: 7 * 24 * 60 * 60 // 7 days
})

// Disable
await sock.sendMessage(jid, {
    disappearingMessagesInChat: false
})
```

---

## 🎨 Profile Management

### Update Profile Name
```typescript
await sock.updateProfileName('New Name')
```

### Update Profile Status
```typescript
await sock.updateProfileStatus('New Status 💧')
```

### Update Profile Picture
```typescript
await sock.updateProfilePicture(jid, { url: './new-pp.jpg' })
```

### Remove Profile Picture
```typescript
await sock.removeProfilePicture(jid)
```

---

## 📊 Events

### Connection Events
```typescript
sock.ev.on('connection.update', (update) => {
    console.log('Connection:', update)
})
```

### Message Events
```typescript
sock.ev.on('messages.upsert', ({ messages }) => {
    console.log('Messages:', messages)
})

sock.ev.on('messages.update', (updates) => {
    console.log('Message updates:', updates)
})

sock.ev.on('messages.delete', (deletes) => {
    console.log('Messages deleted:', deletes)
})
```

### Chat Events
```typescript
sock.ev.on('chats.upsert', (chats) => {
    console.log('New chats:', chats)
})

sock.ev.on('chats.update', (updates) => {
    console.log('Chat updates:', updates)
})
```

### Contact Events
```typescript
sock.ev.on('contacts.upsert', (contacts) => {
    console.log('New contacts:', contacts)
})

sock.ev.on('contacts.update', (updates) => {
    console.log('Contact updates:', updates)
})
```

### Group Events
```typescript
sock.ev.on('groups.upsert', (groups) => {
    console.log('New groups:', groups)
})

sock.ev.on('groups.update', (updates) => {
    console.log('Group updates:', updates)
})

sock.ev.on('group-participants.update', (update) => {
    console.log('Participants update:', update)
})
```

### Presence Events
```typescript
sock.ev.on('presence.update', (presence) => {
    console.log('Presence:', presence)
})
```

---

## 🗄️ Data Store

### In-Memory Store
```typescript
import makeWASocket, { makeInMemoryStore } from '@ryuhan/baileys'

const store = makeInMemoryStore()
store.readFromFile('./baileys_store.json')

setInterval(() => {
    store.writeToFile('./baileys_store.json')
}, 10000)

const sock = makeWASocket()
store.bind(sock.ev)

// Access stored data
console.log('Chats:', store.chats.all())
console.log('Contacts:', store.contacts)
console.log('Messages:', store.messages)
```

---

## 🔧 Utilities

### JID Helpers
```typescript
import { jidEncode, jidDecode, isJidGroup, isJidBroadcast } from '@ryuhan/baileys'

// Encode JID
const jid = jidEncode('6281234567890', 's.whatsapp.net')

// Decode JID
const decoded = jidDecode(jid)

// Check JID type
const isGroup = isJidGroup(jid)
const isBroadcast = isJidBroadcast(jid)
```

### Message Helpers
```typescript
import { getContentType, getDevice, downloadMediaMessage } from '@ryuhan/baileys'

// Get content type
const type = getContentType(message)

// Get device
const device = getDevice(message)

// Download media
const buffer = await downloadMediaMessage(message, 'buffer')
```

---

## 💝 Credits & Inspiration

This project is built upon the amazing work of:

- **[@blck-baileys](https://github.com/blckrose)** - Original modified Baileys fork with advanced features
- **[@WhiskeySockets](https://github.com/WhiskeySockets/Baileys)** - Base Baileys library
- **[@itsukichan](https://github.com/itsukichan/baileys)** - Additional features and improvements

Special thanks to all contributors and the WhatsApp community!

---

## ⚠️ Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries. The official WhatsApp website can be found at [whatsapp.com](https://whatsapp.com).

The maintainers of Rimuru Baileys do not endorse the use of this application for violating WhatsApp's Terms of Service. We emphasize the personal responsibility of users to use it fairly and responsibly.

**Use wisely. Avoid spam. Do not use excessive automation.**

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">Made with 💧 by <a href="https://github.com/ryuhandev">@ryuhandev</a></p>
<p align="center">
  <a href="https://github.com/ryuhandev/rimuru-baileys">GitHub</a> •
  <a href="https://www.npmjs.com/package/@ryuhan/baileys">npm</a> •
  <a href="https://github.com/ryuhandev/rimuru-baileys/issues">Issues</a>
</p>
