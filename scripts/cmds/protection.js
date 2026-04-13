const fs = require("fs");

// in-memory data (simple version)
let data = {
  antilink: false,
  antibot: false,
  antispam: false,
  warn: {},
  spam: {},
  lastMsg: {}
};

module.exports = {
  config: {
    name: "protect",
    version: "3.0",
    role: 1,
    shortDescription: "All-in-one protection system"
  },

  // ⚙️ COMMAND CONTROL
  onStart: async function ({ message, args }) {
    const cmd = args[0];

    if (!cmd) {
      return message.reply(`🛡️ PROTECTION PANEL
━━━━━━━━━━━━━━
antilink: ${data.antilink}
antibot: ${data.antibot}
antispam: ${data.antispam}

Use:
protect antilink on/off
protect antibot on/off
protect antispam on/off`);
    }

    const state = args[1] === "on";

    if (cmd === "antilink") data.antilink = state;
    if (cmd === "antibot") data.antibot = state;
    if (cmd === "antispam") data.antispam = state;

    message.reply(`✅ ${cmd} is now ${state ? "ON" : "OFF"}`);
  },

  // 🧠 MAIN LISTENER
  onChat: async function ({ event, message }) {
    const msg = event.body || "";
    const uid = event.senderID;

    // ⚠️ ADMIN BYPASS (edit manually)
    const admins = ["YOUR_UID_HERE"];
    if (admins.includes(uid)) return;

    // 🔗 ANTI-LINK
    if (data.antilink) {
      if (msg.match(/(https?:\/\/|www\.|\.com|\.net|\.org)/i)) {
        message.reply("🚫 Links not allowed!");

        try {
          await message.removeUserFromGroup(uid);
        } catch {}
        return;
      }
    }

    // 🤖 ANTI-BOT
    if (data.antibot) {
      const suspicious =
        msg.includes("npm start") ||
        msg.includes("bot online") ||
        msg.includes("prefix") ||
        msg.includes("command");

      if (suspicious) {
        message.reply("⚠️ Bot-like activity detected!");

        try {
          await message.removeUserFromGroup(uid);
        } catch {}
        return;
      }
    }

    // 💣 ANTI-SPAM
    if (data.antispam) {
      const now = Date.now();

      if (!data.spam[uid]) {
        data.spam[uid] = 1;
        data.lastMsg[uid] = now;
      } else {
        if (now - data.lastMsg[uid] < 3000) {
          data.spam[uid]++;
        } else {
          data.spam[uid] = 1;
        }
        data.lastMsg[uid] = now;
      }

      if (data.spam[uid] >= 5) {
        message.reply("🚫 Spam detected!");

        try {
          await message.removeUserFromGroup(uid);
        } catch {}
        return;
      }
    }
  }
};
