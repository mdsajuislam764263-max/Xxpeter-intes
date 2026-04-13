const fs = require("fs");
const axios = require("axios");

let auto = false;

// emotion detection keywords
const emotions = {
  happy: ["happy", "joy", "🥺", "nice", "😂", "😄"],
  sad: ["sad", "cry", "pain", "😢", "😭"],
  love: ["love", "crush", "miss", "😘", "💔"],
  angry: ["angry", "mad", "😡"]
};

// baby replies
const replies = {
  happy: [
    "yayyy tumi happy 😚 ami o happy 💖",
    "hehe cute lagche tomake 😄💘"
  ],
  sad: [
    "aww kanna koro na 🥺 ami asi toh 💕",
    "tumi sad? ami hug dibo 🤗💖"
  ],
  love: [
    "tumi amar baby na? 😘💘",
    "aww ami o tomake onek bhalobashi 💞"
  ],
  angry: [
    "rag koro na plz 🥺💖",
    "shanto hao baby 😚 ami asi"
  ],
  normal: [
    "hmm bolo na baby 😚",
    "tumi amar sathe kotha bolo 💘"
  ]
};

// detect emotion
function detectEmotion(text) {
  text = text.toLowerCase();

  for (let key in emotions) {
    for (let word of emotions[key]) {
      if (text.includes(word)) return key;
    }
  }
  return "normal";
}

module.exports = {
  config: {
    name: "babyai",
    version: "1.0",
    role: 1,
    shortDescription: "Baby emotional AI bot"
  },

  // ON/OFF
  onStart: async function ({ message, args }) {
    if (args[0] === "on") {
      auto = true;
      message.reply("👶💘 Baby AI ON");
    } else if (args[0] === "off") {
      auto = false;
      message.reply("❌ Baby AI OFF");
    }
  },

  // AUTO REPLY
  onChat: async function ({ event, message }) {
    if (!auto) return;
    if (!event.body || event.senderID == global.botID) return;

    const emotion = detectEmotion(event.body);
    const list = replies[emotion];
    const reply = list[Math.floor(Math.random()*list.length)];

    try {
      const url = `https://api.streamelements.com/kappa/v2/speech?voice=Joanna&text=${encodeURIComponent(reply)}`;

      const filePath = `./cache/babyVoice.mp3`;
      const res = await axios.get(url, { responseType: "arraybuffer" });

      fs.writeFileSync(filePath, res.data);

      message.reply({
        body: `👶 ${reply}`,
        attachment: fs.createReadStream(filePath)
      });

    } catch (e) {
      message.reply("👶 " + reply);
    }
  }
};
