let muteList = {};

module.exports = {
  config: {
    name: "admin",
    version: "1.0",
    role: 1,
    shortDescription: "Admin control system"
  },

  onStart: async function ({ message, args, api, event }) {
    const cmd = args[0];
    const uid = args[1];

    if (!cmd) {
      return message.reply(`
🛡️ ADMIN PANEL
━━━━━━━━━━━━━━
⚡ .admin kick UID
⚡ .admin mute UID
⚡ .admin unmute UID
⚡ .admin warn UID
━━━━━━━━━━━━━━
🔐 Admin Only
`);
    }

    // 🚫 KICK
    if (cmd === "kick") {
      if (!uid) return message.reply("❌ UID dao");

      try {
        await api.removeUserFromGroup(uid, event.threadID);
        message.reply(`🚫 User ${uid} kicked`);
      } catch {
        message.reply("❌ Failed (bot not admin?)");
      }
    }

    // 🔇 MUTE
    if (cmd === "mute") {
      if (!uid) return message.reply("❌ UID dao");

      muteList[uid] = true;
      message.reply(`🔇 User ${uid} muted`);
    }

    // 🔊 UNMUTE
    if (cmd === "unmute") {
      delete muteList[uid];
      message.reply(`🔊 User ${uid} unmuted`);
    }

    // ⚠️ WARN
    if (cmd === "warn") {
      message.reply(`⚠️ Warning sent to ${uid}`);
    }
  },

  // 🔇 BLOCK MESSAGE IF MUTED
  onChat: async function ({ event, message }) {
    if (muteList[event.senderID]) {
      return message.reply("🔇 You are muted by admin!");
    }
  }
};
