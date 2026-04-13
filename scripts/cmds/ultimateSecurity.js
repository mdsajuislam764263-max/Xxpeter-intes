const fs = require("fs");

const dbPath = "./security_data.json";

// 📦 LOAD / SAVE DATABASE
function loadDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({
      antiout: false,
      protect: false,
      antiban: true,
      admins: ["61582071385233"],
      warnings: {},
      spam: {},
      lastMsg: {},
      logs: []
    }, null, 2));
  }
  return JSON.parse(fs.readFileSync(dbPath));
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
  config: {
    name: "security",
    version: "7.0",
    role: 1,
    shortDescription: "Ultimate Security System V2"
  },

  // 🎛️ CONTROL PANEL
  onStart: async function ({ message, args }) {
    const db = loadDB();
    const cmd = args[0];

    if (!cmd) {
      return message.reply(`🛡️ ULTIMATE SECURITY V2
━━━━━━━━━━━━━━
AntiOut: ${db.antiout}
Protect: ${db.protect}
AntiBan: ${db.antiban}

Admins: ${db.admins.length}

Use:
security antiout on/off
security protect on/off
security antiban on/off
security admin add/remove UID`);
    }

    const state = args[1] === "on";

    if (cmd === "antiout") db.antiout = state;
    if (cmd === "protect") db.protect = state;
    if (cmd === "antiban") db.antiban = state;

    if (cmd === "admin") {
      const action = args[1];
      const uid = args[2];

      if (action === "add" && uid) {
        if (!db.admins.includes(uid)) db.admins.push(uid);
      }
      if (action === "remove") {
        db.admins = db.admins.filter(id => id !== uid);
      }
    }

    saveDB(db);
    message.reply(`✅ Updated: ${cmd}`);
  },

  // 🧠 EVENT HANDLER
  onEvent: async function ({ event, api, message }) {
    const db = loadDB();
    const threadID = event.threadID;

    // 🚪 ANTI-OUT
    if (db.antiout && event.logMessageType === "log:unsubscribe") {
      const uid = event.logMessageData.leftParticipantFbId;
      const author = event.author;

      if (uid == author && !db.admins.includes(uid)) {
        try {
          await api.addUserToGroup(uid, threadID);
          message.reply("🚫 Re-added user (AntiOut)");
          db.logs.push(`Re-added: ${uid}`);
        } catch {
          message.reply("⚠️ Can't re-add user");
        }
      }
    }

    // 🤖 ANTI-BAN (BOT REMOVE)
    if (db.antiban && event.logMessageType === "log:unsubscribe") {
      const botID = api.getCurrentUserID();
      const leftID = event.logMessageData.leftParticipantFbId;

      if (leftID == botID) {
        try {
          await api.sendMessage("🚨 Bot removed! Re-add me to restore security!", threadID);
        } catch {}
      }
    }

    saveDB(db);
  },

  // 💬 CHAT PROTECTION
  onChat: async function ({ event, api, message }) {
    const db = loadDB();
    if (!db.protect) return;

    const uid = event.senderID;
    const msg = event.body || "";

    if (db.admins.includes(uid)) return;

    // 🔗 ANTI-LINK
    if (msg.match(/(https?:\/\/|www\.|\.com|\.net|\.org)/i)) {
      message.reply("🚫 Link blocked!");
      await safeKick(api, uid, event.threadID);
      db.logs.push(`Link: ${uid}`);
    }

    // 🤖 SMART BOT DETECT
    if (msg.includes("bot") && msg.includes("command")) {
      message.reply("⚠️ Bot detected!");
      await safeKick(api, uid, event.threadID);
      db.logs.push(`Bot: ${uid}`);
    }

    // 💣 ANTI-SPAM + WARNING SYSTEM
    const now = Date.now();

    if (!db.spam[uid]) {
      db.spam[uid] = 1;
      db.lastMsg[uid] = now;
    } else {
      if (now - db.lastMsg[uid] < 3000) {
        db.spam[uid]++;
      } else {
        db.spam[uid] = 1;
      }
      db.lastMsg[uid] = now;
    }

    if (db.spam[uid] >= 5) {
      db.warnings[uid] = (db.warnings[uid] || 0) + 1;
      message.reply(`⚠️ Warning ${db.warnings[uid]}/3`);

      if (db.warnings[uid] >= 3) {
        await safeKick(api, uid, event.threadID);
        db.warnings[uid] = 0;
        message.reply("🚫 User removed (spam)");
      }
    }

    saveDB(db);
  }
};

// 🔧 SAFE KICK FUNCTION
async function safeKick(api, uid, threadID) {
  try {
    await api.removeUserFromGroup(uid, threadID);
  } catch {}
}
