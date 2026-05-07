// File Name: bby.js

const axios = require("axios");

const mahmud = [
  "baby",
  "bby",
  "babu",
  "jan",
  "bot"
];

const baseApiUrl = async () => {
  const base = await axios.get(
    "https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json"
  );
  return base.data.mahmud;
};

module.exports = {
  config: {
    name: "bby",
    version: "1.0",
    author: "saju",
    role: 0,
    category: "chat",
    shortDescription: "Admin Only Chat",
    longDescription: "Stylish Admin Only Chat System",
    guide: "{pn} hello"
  },

  onChat: async function ({ api, event, commandName }) {

    const adminUIDs = ["61582071385233"];

    // Admin Only
    if (!adminUIDs.includes(event.senderID)) return;

    const message = event.body?.toLowerCase() || "";

    if (
      event.type !== "message_reply" &&
      mahmud.some(word => message.startsWith(word))
    ) {

      api.setMessageReaction("🪽", event.messageID, () => {}, true);

      const randomReplies = [
        "━━❖ 💕 𝗕𝗼𝗹𝗼 𝗕𝗮𝗯𝘆 😘 ❖━━",
        "🌸 𝗔𝗺𝗮𝗸𝗲 𝗗𝗮𝗸𝗹𝗲 𝗞𝗶𝘀𝘀 𝗗𝗶𝗺𝘂 😚",
        "💫 𝗕𝗲𝘀𝗵𝗶 𝗕𝗯𝘆 𝗕𝗼𝗹𝗹𝗲 𝗟𝗲𝗮𝘃𝗲 𝗡𝗶𝗯𝗼 😼",
        "🌷 𝗧𝘂𝗺𝗶 𝗔𝗺𝗮𝗿 𝗝𝗮𝗻𝘂...? 🙈",
        "✨ 𝗕𝗼𝘀𝘀 𝗕𝗼𝗹 𝗕𝗼𝘀𝘀 😎"
      ];

      const msgParts = message.trim().split(/\s+/);

      if (msgParts.length === 1 && event.attachments.length === 0) {

        const reply =
          randomReplies[Math.floor(Math.random() * randomReplies.length)];

        return api.sendMessage(
          reply,
          event.threadID,
          (err, info) => {

            if (!err)
              global.GoatBot.onReply.set(info.messageID, {
                commandName,
                author: event.senderID
              });

          },
          event.messageID
        );

      } else {

        let userText = message;

        for (const p of mahmud) {
          if (message.startsWith(p)) {
            userText = message.substring(p.length).trim();
            break;
          }
        }

        try {

          const baseUrl = await baseApiUrl();

          const res = await axios.post(`${baseUrl}/api/hinata`, {
            text: userText,
            style: 3,
            attachments: event.attachments
          });

          return api.sendMessage(
            `╭─❖ 🌸 𝗛𝗜𝗡𝗔𝗧𝗔 𝗔𝗜 🌸 ❖─╮\n│ ${res.data.message}\n╰────────────────╯`,
            event.threadID,
            (err, info) => {

              if (!err)
                global.GoatBot.onReply.set(info.messageID, {
                  commandName,
                  author: event.senderID
                });

            },
            event.messageID
          );

        } catch (e) {
          console.error(e);
        }
      }
    }
  }
};
