module.exports = {
  config: {
    name: "antiout",
    version: "1.0",
    role: 1,
    shortDescription: "Prevent leaving (auto add back)"
  },

  onStart: async function ({ message, args, globalData }) {
    const state = args[0];
    globalData.antiout = state === "on";

    message.reply(`🚪 Anti-Out is now ${state}`);
  },

  onEvent: async function ({ event, message, api, globalData }) {
    if (!globalData.antiout) return;

    // detect leave event
    if (event.logMessageType === "log:unsubscribe") {
      const leftUser = event.logMessageData.leftParticipantFbId;
      const author = event.author;

      // skip if admin removed user
      if (leftUser != author) return;

      try {
        await api.addUserToGroup(leftUser, event.threadID);

        message.reply(`🚫 You can't leave 😈\nUser re-added!`);
      } catch (e) {
        message.reply("❌ Failed to re-add (maybe privacy settings)");
      }
    }
  }
};
