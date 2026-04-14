const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "say",
    version: "2.0",
    role: 0,
    shortDescription: "Better free voice"
  },

  onStart: async function ({ message, args }) {
    const lang = args[0]; // bn / en
    const text = args.slice(1).join(" ");

    if (!text) {
      return message.reply(
        "❌ Use:\n.say bn আমি তোমাকে ভালোবাসি 💖\n.say en Hello baby 😘"
      );
    }

    try {
      const tl = (lang === "bn") ? "bn" : "en";

      // small trick: add pauses for natural feel
      const betterText = text
        .replace(/\./g, "... ")
        .replace(/,/g, ", ")
        .replace(/!/g, "! ");

      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(betterText)}&tl=${tl}&client=tw-ob`;

      const res = await axios.get(url, {
        responseType: "arraybuffer",
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      const filePath = "./cache/betterVoice.mp3";
      fs.writeFileSync(filePath, res.data);

      await message.reply({
        body: "🎤 Better Voice Ready 😍",
        attachment: fs.createReadStream(filePath)
      });

    } catch (e) {
      message.reply("❌ Voice error (VPN try koro)");
    }
  }
};
