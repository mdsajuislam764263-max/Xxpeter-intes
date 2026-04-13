let settings = {
  antiout: true,
  antilink: true,
  antibot: true
};

module.exports = {
  config: {
    name: "guard",
    version: "2.0",
    role: 1,
    shortDescription: "Full group protection system"
  },

  // ⚙️ CONTROL PANEL
  onStart: async function ({ message, args }) {
    const cmd = args[0];

    if (cmd === "on") {
      settings.antiout = true;
      settings.antilink = true;
      settings.antibot = true;
      return message.reply("🛡️ FULL PROTECTION ENABLED");
    }

    if (cmd === "off") {
      settings.antiout = false;
      settings.antilink = false;
      settings.antibot = false;
      return message.reply("❌ PROTECTION DISABLED");
    }

    message.reply(`
🛡️ GUARD PANEL
━━━━━━━━━━━━━━
⚡ .guard on
⚡ .guard off
━━━━━━━━━━━━━━
👑 Admin Only
`);
  },

  // 🔍 EVENT LISTENER
  onEvent: async function ({ event, api, message }) {

    // 🚪 Anti-Out
    if (settings.antiout && event.logMessageType === "log:unsubscribe") {
      const left = event.logMessageData.leftParticipantFbId;
      const author = event.author;

      if (left == author) {
        try {
          await api.addUserToGroup(left, event.threadID);
          message.reply("🚫 You can't leave 😈 (re-added)");
        } catch {}
      }
    }

    // 🚫 Anti-Link
    if (settings.antilink && event.body) {
      if (event.body.includes("http")) {
        try {
          await api.removeUserFromGroup(event.senderID, event.threadID);
          message.reply("🚫 Link not allowed!");
        } catch {}
      }
    }

    // 🚫 Anti-Bot (simple detect)
    if (settings.antibot && event.body) {
      if (event.body.toLowerCase().includes("bot")) {
        message.reply("⚠️ Bot activity detected!");
      }
    }
  }
};
