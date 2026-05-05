const axios = require("axios");
const fs = require("fs");
const path = require("path");

const mahmud = async () => {
const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
  return base.data.mahmud;
};

/**
* @author MahMUD
* @author: do not delete it
*/

module.exports = {
  config: {
    name: "bed",
    version: "1.7",
    author: "MahMUD",
    countDown: 5,
    role: 0,
    longDescription: "Generate anime-styles bed hug bast image",
    category: "love",
    guide: "{pn} @mention"
  },

  onStart: async function ({ message, event, api }) {
    try {
      const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 77, 85, 68);
      if (module.exports.config.author.trim() !== obfuscatedAuthor) {
        return api.sendMessage(
          "❌ | You are not authorized to change the author name.",
          event.threadID,
          event.messageID
        );
      }

      const mention = Object.keys(event.mentions);
      if (mention.length === 0) {
        return message.reply("Please replay mention someone");
      }

      const senderID = event.senderID;
      const targetID = mention[0];

      const base = await mahmud();
      const apiURL = `${base}/api/bed`;

      message.reply(" 𝒐𝒊𝒊 wait..𝒌𝒐𝒓 𝒑𝒍𝒆𝒂𝒔𝒆😒😒.");

      const response = await axios.post(
        apiURL,
        { senderID, targetID },
        { responseType: "arraybuffer" }
      );

      const imgPath = path.join(__dirname, `bed_${senderID}_${targetID}.png`);
      fs.writeFileSync(imgPath, Buffer.from(response.data, "binary"));

      message.reply({
        body: "𝒐𝒏𝒂𝒄𝒌 𝒌𝒐𝒔𝒕𝒐 𝒌𝒐𝒓𝒂 𝒃𝒂𝒏𝒂𝒊𝒍𝒂😥",
        attachment: fs.createReadStream(imgPath)
      });

      setTimeout(() => {
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }, 10000);

    } catch (err) {
      console.error("Error in sommand:", err.message || err);
      message.reply("🥹error, contact MahMUD.");
    }
  }
};
