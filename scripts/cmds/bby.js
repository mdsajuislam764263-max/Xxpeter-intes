const axios = require("axios");

const mahmud = [
        "màrí","Ava","mari","bbu","jan","bot",
        "জান","জানু","বেবি","wifey","hinata"
];

const baseApiUrl = async () => {
        const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
        return base.data.mahmud;
};

// ✅ ADMIN CHECK FUNCTION
const isAdmin = (uid) => {
        return global.GoatBot?.config?.adminBot?.includes(uid);
};

module.exports = {
        config: {
                name: "hinata",
                aliases: ["mari","Ava","màrí","jan","janu","wifey","bot"],
                version: "1.8",
                author: "MahMUD",
                countDown: 2,
                role: 0,
                description: {
                        bn: "হিনাতা এআই এর সাথে চ্যাট করুন",
                        en: "Chat with Hinata AI"
                },
                category: "chat"
        },

        onStart: async function ({ api, event, args, usersData, getLang, commandName }) {

                const uid = event.senderID;

                // ❌ ADMIN ONLY BLOCK
                if (!isAdmin(uid))
                        return api.sendMessage("⛔ This bot is admin-only.", event.threadID);

                if (!args[0])
                        return api.sendMessage(getLang("noInput"), event.threadID);

                try {
                        const baseUrl = await baseApiUrl();

                        const res = await axios.post(`${baseUrl}/api/hinata`, {
                                text: args.join(" "),
                                style: 3,
                                attachments: event.attachments || []
                        });

                        return api.sendMessage(res.data.message, event.threadID);

                } catch (err) {
                        return api.sendMessage("Error: " + err.message, event.threadID);
                }
        },

        onReply: async function ({ api, event }) {

                // ❌ ADMIN ONLY BLOCK
                if (!isAdmin(event.senderID)) return;

                try {
                        const baseUrl = await baseApiUrl();

                        const res = await axios.post(`${baseUrl}/api/hinata`, {
                                text: event.body?.toLowerCase() || "hi",
                                style: 3,
                                attachments: event.attachments || []
                        });

                        return api.sendMessage(res.data.message, event.threadID);

                } catch (err) {
                        console.error(err);
                }
        },

        onChat: async function ({ api, event }) {

                const uid = event.senderID;

                // ❌ ADMIN ONLY BLOCK
                if (!isAdmin(uid)) return;

                const message = event.body?.toLowerCase() || "";

                if (event.type !== "message_reply" &&
                        mahmud.some(word => message.startsWith(word))) {

                        api.setMessageReaction("🪽", event.messageID, () => {}, true);

                        const baseUrl = await baseApiUrl();

                        const res = await axios.post(`${baseUrl}/api/hinata`, {
                                text: message,
                                style: 3,
                                attachments: event.attachments || []
                        });

                        return api.sendMessage(res.data.message, event.threadID);
                }
        }
};
