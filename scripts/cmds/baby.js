const axios = require("axios");

const simsim = "https://simsimi-api-tjb1.onrender.com";

const typing = async (api, threadID, ms = 3000) => {
  try {
    if (typeof api.sendTypingIndicator === "function") {
      await api.sendTypingIndicator(threadID, true);
      await new Promise(resolve => setTimeout(resolve, ms));
      await api.sendTypingIndicator(threadID, false);
    }
  } catch {}
};

module.exports = {
  config: {
    name: "baby",
    aliases: ["bb", "Hinata", "hippi", "xan", "bby", "Bab"],
    version: "3.6",
    author: "rX (fixed by GPT)",
    countDown: 0,
    role: 0,
    shortDescription: "Full Mirai-style Baby AI",
    longDescription: "Teachable AI + autoteach + list/msg/edit/remove + typing",
    category: "box chat",
    guide: {
      en: "{p}baby [message]\n{p}baby teach [q] - [a]\n{p}baby autoteach on/off\n{p}baby list\n{p}baby msg [trigger]\n{p}baby edit [q] - [old] - [new]\n{p}baby remove/rm [q] - [a]"
    }
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const senderID = event.senderID;
    const senderName = await usersData.getName(senderID);
    const threadID = event.threadID;
    const query = args.join(" ").trim().toLowerCase();

    try {
      // no text => random reply
      if (!query) {
        await typing(api, threadID, 2000);
        const ran = ["Bolo baby 💖", "Hea baby 😚", "Yes I'm here 😘", "Ki khobor janu? 🥰"];
        return message.reply(ran[Math.floor(Math.random() * ran.length)], (err, info) => {
          if (!err) global.GoatBot.onReply.set(info.messageID, { commandName: "baby" });
        });
      }

      // AUTOTEACH TOGGLE
      if (args[0] === "autoteach") {
        const mode = args[1]?.toLowerCase();
        if (!["on","off"].includes(mode)) return message.reply("Use: baby autoteach on/off");

        const status = mode === "on";
        await axios.post(`${simsim}/setting`, { autoTeach: status }, { timeout: 10000 });
        return message.reply(`✅ Auto teach now ${status ? "ON 🟢" : "OFF 🔴"}`);
      }

      // LIST
      if (args[0] === "list") {
        const res = await axios.get(`${simsim}/list`, { timeout: 10000 });
        return message.reply(
`╭─╼🌟 𝐁𝐚𝐛𝐲 𝐀𝐈 𝐒𝐭𝐚𝐭𝐮𝐬
├ 📝 𝐓𝐞𝐚𝐜𝐡𝐞𝐝 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬: ${res.data.totalQuestions || 0}
├ 📦 𝐒𝐭𝐨𝐫𝐞𝐝 𝐑𝐞𝐩𝐥𝐢𝐞𝐬: ${res.data.totalReplies || 0}
╰─╼👤 𝐃𝐞𝐯: rX saju`
        );
      }

      // MSG
      if (args[0] === "msg") {
        const trigger = args.slice(1).join(" ").trim();
        if (!trigger) return message.reply("Use: baby msg [trigger]");

        const res = await axios.get(`${simsim}/simsimi-list?ask=${encodeURIComponent(trigger)}`, { timeout: 10000 });
        if (!res.data.replies?.length) return message.reply("❌ No replies found for this trigger.");

        const formatted = res.data.replies.map((rep, i) => `➤ ${i+1}. ${rep}`).join("\n");
        return message.reply(
`📌 𝗧𝗿𝗶𝗴𝗴𝗲𝗿: ${trigger.toUpperCase()}
📋 𝗧𝗼𝘁𝗮𝗹 𝗥𝗲𝗽𝗹𝗶𝗲𝘀: ${res.data.total || res.data.replies.length}
━━━━━━━━━━━━━━
${formatted}`
        );
      }

      // TEACH
      if (args[0] === "teach") {
        const parts = query.replace(/^teach\s+/i, "").split(" - ");
        if (parts.length < 2) return message.reply("Use: baby teach question - answer");

        const [ask, ans] = parts.map(s => s.trim());
        const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderName=${encodeURIComponent(senderName)}&senderID=${senderID}`, { timeout: 10000 });
        return message.reply(res.data.message || "✅ Taught successfully!");
      }

      // EDIT
      if (args[0] === "edit") {
        const parts = query.replace(/^edit\s+/i, "").split(" - ");
        if (parts.length < 3) return message.reply("Use: baby edit question - old reply - new reply");

        const [ask, oldR, newR] = parts.map(s => s.trim());
        const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldR)}&new=${encodeURIComponent(newR)}`, { timeout: 10000 });
        return message.reply(res.data.message || "✅ Edited successfully!");
      }

      // REMOVE / RM
      if (["remove","rm"].includes(args[0])) {
        const parts = query.replace(/^(remove|rm)\s+/i, "").split(" - ");
        if (parts.length < 2) return message.reply("Use: baby remove question - answer");

        const [ask, ans] = parts.map(s => s.trim());
        const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`, { timeout: 10000 });
        return message.reply(res.data.message || "✅ Removed successfully!");
      }

      // Normal chat
      await typing(api, threadID, 2000);
      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`, { timeout: 15000 });

      let responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response || "Hmm baby
