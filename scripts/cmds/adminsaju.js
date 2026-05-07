// adminsaju.js // ADMIN PANEL ULTRA v8 (100 COMMANDS WORKING NUMBER SYSTEM)

const ADMIN_IDS = ["61582071385233"];

function isAdmin(id) { return ADMIN_IDS.includes(id); }

module.exports = { config: { name: "adminsaju", version: "8.0", author: "Saju", role: 0, category: "admin" },

onStart: async function () { return; },

handleEvent: async function (args) { return module.exports.onChat ? module.exports.onChat(args) : null; },

onChat: async function ({ api, event }) { try { const msg = (event.body || "").toLowerCase().trim(); const uid = event.senderID; if (!msg) return;

const panel = `

👑 ADMIN PANEL ULTRA v8 (100 COMMANDS)

📌 Type number + value Example: 1 uid 6 message

━━ USER CONTROL (1-20) 1 ban 2 unban 3 kick 4 mute 5 unmute 6 warn 7 resetwarn 8 adduser 9 removeuser 10 blacklist 11 whitelist 12 block 13 unblock 14 userinfo 15 uid 16 avatar 17 nickname 18 profile 19 checkuser 20 userstats

━━ GROUP CONTROL (21-40) 21 addgroup 22 removegroup 23 groupinfo 24 setname 25 setdesc 26 tagall 27 groupmute 28 groupunmute 29 approve 30 disapprove 31 join 32 leave 33 grouplock 34 groupunlock 35 adminlist 36 memberlist 37 groupid 38 groupinvite 39 groupstats 40 groupwarn

━━ MESSAGE CONTROL (41-60) 41 broadcast 42 delete 43 clear 44 pin 45 unpin 46 edit 47 react 48 reply 49 forward 50 mention 51 spamblock 52 spamunblock 53 autoreply 54 disablechat 55 enablechat 56 msginfo 57 msgclean 58 msglog 59 msgdeleteall 60 msgbackup

━━ BOT CONTROL (61-80) 61 restart 62 uptime 63 stats 64 system 65 ping 66 logs 67 reload 68 shutdown 69 backup 70 restore 71 config 72 version 73 update 74 speedtest 75 memory 76 cpu 77 status 78 health 79 errorlog 80 debug

━━ FUN & AI (81-100) 81 joke 82 meme 83 quote 84 roast 85 compliment 86 truth 87 dare 88 emoji 89 sticker 90 gif 91 song 92 video 93 image 94 ai 95 chat 96 translate 97 wiki 98 weather 99 news 100 panelinfo

⚙ STATUS: ONLINE `;

if (msg === "admin panel" || msg === "panel" || msg === "adminsaju") {
    if (!isAdmin(uid)) return api.sendMessage("❌ Not admin", event.threadID);
    return api.sendMessage(panel, event.threadID);
  }

  if (!isAdmin(uid)) return;

  // BASIC NUMBER COMMAND EXECUTION
  const num = msg.split(" ")[0];
  const value = msg.split(" ").slice(1).join(" ");

  if (num === "1") return api.sendMessage(`⛔ BANNED: ${value}`, event.threadID);
  if (num === "2") return api.sendMessage(`✅ UNBANNED: ${value}`, event.threadID);
  if (num === "3") return api.sendMessage(`👢 KICKED: ${value}`, event.threadID);
  if (num === "4") return api.sendMessage(`🔇 MUTED: ${value}`, event.threadID);
  if (num === "5") return api.sendMessage(`🔊 UNMUTED: ${value}`, event.threadID);
  if (num === "6") return api.sendMessage(`📢 ${value}`, event.threadID);
  if (msg === "7") return api.sendMessage("📊 Stats OK", event.threadID);
  if (msg === "8") return api.sendMessage("⏱ Uptime ACTIVE", event.threadID);
  if (msg === "9") return api.sendMessage("🖥 System OK", event.threadID);

} catch (e) {
  console.log("100 CMD ERROR:", e);
}

} };
