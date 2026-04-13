const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "pgirl",
    version: "1.0",
    role: 1, // admin only
    shortDescription: "Profile pic to girl style avatar"
  },

  onStart: async function ({ message, args, api }) {
    const uid = args[0];

    if (!uid) {
      return message.reply("❌ UID dao\nExample: .pgirl 1000xxxx");
    }

    try {
      // get profile picture
      const avatarUrl = `https://graph.facebook.com/${uid}/picture?height=512&width=512`;

      // use external AI style API (cartoonize)
      const apiUrl = `https://api.popcat.xyz/jail?image=${encodeURIComponent(avatarUrl)}`;

      const res = await axios.get(apiUrl, { responseType: "arraybuffer" });

      const path = `./cache/girl.png`;
      fs.writeFileSync(path, res.data);

      message.reply({
        body: `👩 Girl Style Avatar (fun) for UID: ${uid}`,
        attachment: fs.createReadStream(path)
      });

    } catch (e) {
      message.reply("❌ Failed to generate image");
    }
  }
};
