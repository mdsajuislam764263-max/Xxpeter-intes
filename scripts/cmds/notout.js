const fs = require("fs");
const path = require("path");

const statusFile = path.join(__dirname, "notout_status.json");

// Initialize status file if not exist
if (!fs.existsSync(statusFile)) {
    fs.writeFileSync(statusFile, JSON.stringify({ enabled: true }, null, 2));
}

module.exports = {
    config: {
        name: "notout",
        version: "1.0",
        author: "Saju",
        description: "Prevent non-admin leave/remove with on/off trigger"
    },

    onStart: async function({ api, event, args }) {
        // Toggle protection on/off
        if (args && args.length > 0) {
            const command = args[0].toLowerCase();
            let data = JSON.parse(fs.readFileSync(statusFile));
            if (command === "on") {
                data.enabled = true;
                fs.writeFileSync(statusFile, JSON.stringify(data, null, 2));
                return api.sendMessage("✅ NotOut protection is now ON", event.threadID, event.messageID);
            }
            if (command === "off") {
                data.enabled = false;
                fs.writeFileSync(statusFile, JSON.stringify(data, null, 2));
                return api.sendMessage("❌ NotOut protection is now OFF", event.threadID, event.messageID);
            }
        }
        api.sendMessage("ℹ️ Usage: notout on / notout off", event.threadID, event.messageID);
    },

    onEvent: async function({ api, event }) {
        try {
            const threadID = event.threadID;
            const senderID = event.senderID;

            // Check status
            const data = JSON.parse(fs.readFileSync(statusFile));
            if (!data.enabled) return;

            // Detect Leave
            if (event.logMessageType === "log:unsubscribe") { 
                const leftID = event.logMessageData.leftParticipantFbId || senderID;
                const admins = await api.getThreadAdmins(threadID);

                if (!admins.includes(leftID)) {
                    api.sendMessage(
                        `❌ @${leftID} তুমি অ্যাডমিন না, leave করতে পারো না!`,
                        threadID,
                        null,
                        { mentions: [{ tag: "user", id: leftID }] }
                    );
                    api.sendMessage(`⚠️ Admins notified about unauthorized leave.`, threadID);
                }
            }

            // Detect Remove
            if (event.logMessageType === "log:remove") {
                const removedID = event.logMessageData.removedParticipantFbId;
                const admins = await api.getThreadAdmins(threadID);

                if (!admins.includes(senderID)) {
                    api.sendMessage(
                        `❌ তুমি অ্যাডমিন না, @${removedID} remove করতে পারো না!`,
                        threadID,
                        null,
                        { mentions: [{ tag: "user", id: removedID }] }
                    );
                    api.sendMessage(`⚠️ Admins notified about unauthorized removal.`, threadID);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
};2 k
