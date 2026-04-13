let settings = {
  antiout: false,
  allowAdminsLeave: true,
  retryLimit: 3,
  delay: 3000
};

module.exports = {
  config: {
    name: "ultraout",
    version: "2.0",
    role: 1,
    shortDescription: "Ultra Anti-Out System"
  },

  // ⚙️ CONTROL PANEL
  onStart: async function ({ message, args }) {
    const cmd = args[0];

    if (!cmd) {
      return message.reply(`🛡️ ULTRA ANTI-OUT

Status: ${settings.antiout}
Admin Leave: ${settings.allowAdminsLeave}

Use:
ultraout on/off
ultraout admin on/off`);
    }

    if (cmd === "on") settings.antiout = true;
    if (cmd === "off") settings.antiout = false;

    if (cmd === "admin") {
      settings.allowAdminsLeave = args[1] === "on";
    }

    message.reply(`✅ Updated: ${cmd}`);
  },

  // 🧠 MAIN EVENT
  onEvent: async function ({ event, api, message }) {
    if (!settings.antiout) return;

    if (event.logMessageType === "log:unsubscribe") {
      const uid = event.logMessageData.leftParticipantFbId;
      const author = event.author;
      const threadID = event.threadID;

      // 👑 skip if kicked by admin
      if (uid != author) return;

      try {
        // check admin (optional skip)
        const info = await api.getThreadInfo(threadID);
        const isAdmin = info.adminIDs.some(a => a.id == uid);

        if (isAdmin && settings.allowAdminsLeave) {
          return message.reply("👑 Admin left (allowed)");
        }

        message.reply("🚫 Leaving not allowed... trying to re-add 😈");

        // 🔁 retry system
        let success = false;
        for (let i = 0; i < settings.retryLimit; i++) {
          try {
            await api.addUserToGroup(uid, threadID);
            success = true;
            break;
          } catch {
            await new Promise(r => setTimeout(r, settings.delay));
          }
        }

        // 📩 fallback invite message
        if (!success) {
          message.reply(`⚠️ Couldn't auto add.\n👉 Ask user to rejoin manually.`);
        } else {
          message.reply("✅ User re-added successfully 😎");
        }

      } catch (err) {
        message.reply("❌ Error handling anti-out");
      }
    }
  }
};
