let msgCount = {};
let lastTime = {};

module.exports = {
  config: {
    name: "antispam",
    version: "1.0",
    role: 1,
    shortDescription: "Anti spam"
  },

  onChat: async function ({ event, message }) {
    const uid = event.senderID;
    const now = Date.now();

    if (!msgCount[uid]) {
      msgCount[uid] = 1;
      lastTime[uid] = now;
      return;
    }

    if (now - lastTime[uid] < 3000) {
      msgCount[uid]++;
    } else {
      msgCount[uid] = 1;
    }

    lastTime[uid] = now;

    if (msgCount[uid] >= 5) {
      message.reply("🚫 Stop spamming!");
      try {
        await message.removeUserFromGroup(uid);
      } catch {}
    }
  }
};
