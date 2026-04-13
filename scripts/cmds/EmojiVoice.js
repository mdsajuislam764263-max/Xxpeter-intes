const fs = require("fs");
const axios = require("axios");

let auto = false;

// emoji detect regex
const emojiRegex = /\p{Emoji}/u;

// cute replies
const replies = [
  "🥰",
  "emoji diye kotha bolba? cute toh 😍",
  "hmm bujhlam tumi amar sathe flirt korteso 😏💘",
  "onek cute lagche tomake 😚",
  "emoji queen naki tumi? 👀💖"
];

module.exports = {
  config: {
    name: "emojivoice",
    version: "1.0",
    role: 1,
    shortDescription: "Emoji auto voice reply"
  },

  // ON/OFF
  onStart: async function ({ message, args }) {
    if (args[0] === "on") {
      auto = true;
      message.reply("💘 Emoji Voice ON");
    } else if (args[0] === "off") {
      auto = false;
      message.reply("❌ Emoji Voice OFF");
    }
  },

  // AUTO REPLY
  onChat: async function ({ event, message }) {
    if (!auto) return;
    if (!event.body || event.senderID == global.botID) return;

    // check emoji only
    if (!emojiRegex.test(event.body)) return;

    const reply = replies[Math.floor(Math.random()*replies.length)];

    try {
      const url = `https://api.streamelements.com/kappa/v2/speech?voice=Joanna&text=${encodeURIComponent(reply)}`;

      const filePath = `./cache/emojiVoice.mp3`;
      const res = await axios.get(url, { responseType: "arraybuffer" });

      fs.writeFileSync(filePath, res.data);

      message.reply({
        body: "💘 " + reply,
        attachment: fs.createReadStream(filePath)
      });

    } catch (e) {
      message.reply("💬 " + reply);
    }
  }
};
