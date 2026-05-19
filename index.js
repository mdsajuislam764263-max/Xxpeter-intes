module.exports = {
  config: {
    name: "noprefix",
    version: "2.0",
    author: "Sàjú",
    role: 0,
    shortDescription: "Admin no prefix system",
    category: "system"
  },

  onChat: async function ({ api, event, message, getLang, usersData }) {

    // 🔥 ADMIN UID
    const adminUID = [
      "61582071385233" // <-- Your Facebook UID
    ];

    // ❌ Ignore Other Users
    if (!adminUID.includes(event.senderID)) return;

    // 📩 Message
    const body = event.body?.trim().toLowerCase();

    if (!body) return;

    // 📂 Load Commands
    const commands = global.GoatBot.commands;

    // 🔍 Find Command Without Prefix
    const command = commands.get(body);

    // ✅ Run Command
    if (command) {
      try {
        await command.onStart({
          api,
          event,
          message,
          args: [],
          usersData,
          getLang
        });
      } catch (e) {
        return message.reply(`❌ Command Error:\n${e.message}`);
      }
    }
  }
};
