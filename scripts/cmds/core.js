module.exports = {
  config: {
    name: "core",
    version: "1.0.0",
    author: "Saju",
    role: 0,
    category: "system"
  },

  onStart: async function ({ api, event }) {
    const { threadID, senderID, body } = event;

    if (!global.bot) global.bot = {};

    if (!body) return;

    const cmd = body.toLowerCase().trim();

    // =====================
    // 🔄 RESTART SYSTEM
    // =====================
    if (cmd === "restart") {
      global.bot[threadID] = { type: "restart", sender: senderID };

      return api.sendMessage(
        "💀 RESTART REQUEST\n\nYES / NO",
        threadID
      );
    }

    if (global.bot[threadID]) {
      const session = global.bot[threadID];

      if (session.sender !== senderID) return;

      if (cmd === "yes" && session.type === "restart") {
        delete global.bot[threadID];
        await api.sendMessage("🔄 Restarting...", threadID);
        setTimeout(() => process.exit(1), 2000);
      }

      if (cmd === "no") {
        delete global.bot[threadID];
        return api.sendMessage("❌ Cancelled", threadID);
      }
    }

    // =====================
    // ⏳ LOADING
    // =====================
    if (cmd === "loading") {
      const frames = ["⏳.", "⏳..", "⏳...", "⚡", "🚀", "✔ Done"];

      return api.sendMessage("⏳.", threadID, (err, info) => {
        let i = 0;

        const interval = setInterval(() => {
          i++;
          if (i >= frames.length) return clearInterval(interval);

          api.editMessage(frames[i], info.messageID, threadID);
        }, 800);
      });
    }

    // =====================
    // 📊 PROGRESS BAR
    // =====================
    if (cmd
