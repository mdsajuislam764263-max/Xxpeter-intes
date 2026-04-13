const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "voice",
    version: "1.0",
    role: 0,
    shortDescription: "AI Love Voice Generator"
  },

  onStart: async function ({ message, args }) {
    const text = args.join(" ");

    if (!text) {
      return message.reply("💬 Use like: .voice I love you 😘");
    }

    try {
      // free TTS API (female style)
      const url = `https://api.streamelements.com/kappa/v2/speech?voice=Joanna&text=${encodeURIComponent(text)}`;

      const filePath = `./cache/voice.mp3`;
      const res = await axios.get(url, { responseType: "arraybuffer" });

      fs.writeFileSync(filePath, res.data);

      message.reply({
        body: "🎤 Love Voice Ready 💘",
        attachment: fs.createReadStream(filePath)
      });

    } catch (e) {
      message.reply("❌ Voice generate failed");
    }
  }
};
