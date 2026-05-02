let antioutStatus = false;

module.exports = {
  name: "antiout",

  run: async function ({ api, event }) {

    const senderID = event.senderID;
    const threadID = event.threadID;
    const msg = event.body.toLowerCase();

    // 🔒 Admin only (optional check)
    const OWNER = process.env.OWNER_ID;
    if (senderID != OWNER) {
      return api.sendMessage("⛔ Only admin can use this!", threadID);
    }

    // ⚙️ ON/OFF system
    if (msg === "antiout on") {
      antioutStatus = true;
      return api.sendMessage("✅ AntiOut Enabled", threadID);
    }

    if (msg === "antiout off") {
      antioutStatus = false;
      return api.sendMessage("❌ AntiOut Disabled", threadID);
    }
  },

  // 🔥 Event listener (important)
  handleEvent: async function ({ api, event }) {

    if (!antioutStatus) return;

    if (event.type === "event" && event.logMessageType === "log:unsubscribe") {

      const leftUID = event.logMessageData.leftParticipantFbId;
      const threadID = event.threadID;

      // bot নিজে remove হলে skip
      if (leftUID == api.getCurrentUserID()) return;

      // notify
      api.sendMessage(
        `⚠️ User left the group\nUID: ${leftUID}\nTrying to add back...`,
        threadID
      );

      // re-add চেষ্টা
      api.addUserToGroup(leftUID, threadID, (err) => {
        if (err) {
          api.sendMessage("❌ Could not re-add user.", threadID);
        } else {
          api.sendMessage("✅ User added back!", threadID);
        }
      });
    }
  }
};
