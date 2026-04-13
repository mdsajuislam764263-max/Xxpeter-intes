let mutedUsers = [];

module.exports = {
  config: {
    name: "mute",
    role: 1,
    shortDescription: "Mute user"
  },

  onStart: async function ({ message, event }) {
    const uid = event.mentions ? Object.keys(event.mentions)[0] : null;
    if (!uid) return message.reply("❌ Mention user");

    mutedUsers.push(uid);
    message.reply(`🔇 User muted`);
  },

  onChat: async function ({ event }) {
    if (mutedUsers.includes(event.senderID)) {
      return;
    }
  }
};
