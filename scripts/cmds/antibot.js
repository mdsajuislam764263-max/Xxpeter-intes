let knownBots = [];

module.exports = {
  config: {
    name: "antibot",
    version: "1.0",
    role: 1,
    shortDescription: "Detect bots"
  },

  onStart: async function ({ message }) {
    message.reply("🤖 Anti-bot system active");
  },

  onChat: async function ({ event, message }) {
    const text = event.body || "";

    // simple detection patterns
    const suspicious =
      text.includes("npm start") ||
      text.includes("bot online") ||
      text.includes("prefix") ||
      text.includes("command list");

    if (suspicious) {
      if (!knownBots.includes(event.senderID)) {
        knownBots.push(event.senderID);
        message.reply("⚠️ Possible bot detected!");

        try {
          await message.removeUserFromGroup(event.senderID);
        } catch {}
      }
    }
  }
};
