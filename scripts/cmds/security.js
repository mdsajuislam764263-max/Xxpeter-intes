const fs = require("fs");

let settings = {
  antiout: false,
  protect: false,
  antiban: true,
  admins: ["61582071385233"],

  spam: {},
  lastMsg: {}
};

module.exports = {
  config: {
    name: "security",
    version: "5.0",
    role: 1,
    shortDescription: "Full security system"
  },

  // ⚙️ CONTROL PANEL
  onStart: async function ({ message, args }) {
    const cmd = args[0];

    if (!cmd) {
      return message.reply(`🛡️ SECURITY PANEL
━━━━━━━━━━━━━━
AntiOut: ${settings.antiout}
Protect: ${settings.protect}
AntiBan: ${settings.antiban}

Use:
security antiout on/off
security protect on/off
security antiban on/off`);
    }

    const state = args[1] === "on";

    if (cmd === "antiout") settings.antiout = state;
    if (cmd === "protect") settings.protect = state;
    if (cmd === "antiban") settings.antiban = state;

    message.reply(`✅ ${cmd} → ${state ? "ON" : "OFF"}`);
  },

  // 🧠 MAIN EVENT HANDLER
  onEvent: async function ({ event, api, message }) {
    const threadID = event.threadID;

    // 🔄 ANTI-OUT
    if (settings.antiout && event.logMessageType === "log:unsubscribe") {
      const uid = event.logMessageData.leftParticipantFbId;
      const author = event.author;

      if (uid == author && !settings.admins.includes(uid)) {
        try {
          await api.addUserToGroup(uid, threadID);
          message.reply("🚫 You can't leave 😈 (re-added)");
        } catch {
          message.reply("⚠️ Can't re-add user");
        }
      }
    }

    // 🛡️ ANTI-BAN (bot removed)
    if (settings.antiban && event.logMessageType === "log:unsubscribe") {
      const botID = api.getCurrentUserID();
      const leftID = event.logMessageData.leftParticipantFbId;

      if (leftID == botID) {
        try {
          await api.sendMessage("🚨 Bot removed! Add me back to restore security.", threadID);
        } catch {}
      }
    }
  },

  // 💬 CHAT PROTECTION
  onChat: async function ({ event, message, api }) {
    if (!settings.protect) return;

    const msg = event.body || "";
    const uid = event.senderID;

    if (settings.admins.includes(uid)) return;

    // 🔗 ANTI-LINK
    if (msg.match(/(https?:\/\/|www\.|\.com|\.net|\.org)/i)) {
      message.reply("🚫 Links not allowed!");
      try {
        await api.removeUserFromGroup(uid, event.threadID);
      } catch {}
      return;
    }

    // 🤖 ANTI-BOT
    if (
      msg.includes("npm start") ||
      msg.includes("prefix") ||
      msg.includes("bot online")
    ) {
      message.reply("⚠️ Bot detected!");
      try {
        await api.removeUserFromGroup(uid, event.threadID);
      } catch {}
      return;
    }

    // 💣 ANTI-SPAM
    const now = Date.now();

    if (!settings.spam[uid]) {
      settings.spam[uid] = 1;
      settings.lastMsg[uid] = now;
    } else {
      if (now - settings.lastMsg[uid] < 3000) {
        settings.spam[uid]++;
      } else {
        settings.spam[uid] = 1;
      }
      settings.lastMsg[uid] = now;
    }

    if (settings.spam[uid] >= 5) {
      message.reply("🚫 Spam detected!");
      try {
        await api.removeUserFromGroup(uid, event.threadID);
      } catch {}
    }
  }
};
