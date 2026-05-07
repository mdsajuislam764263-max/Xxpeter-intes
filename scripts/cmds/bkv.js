// bkv.js
// Broken song TikTok sender command (template)

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "bkv",
    version: "1.0",
    author: "Saju",
    role: 0,
    category: "music",
    shortDescription: "Send broken song (TikTok link)"
  },

  onStart: async function () {
    return;
  },

  onChat: async function ({ api, event }) {
    try {
      const msg = event.body;
      if (!msg) return;

      // trigger keywords
      const triggers = ["bkv", "broken", "song", "💔"];
      const found = triggers.some(t => msg.toLowerCase().includes(t));

      if (!found) return;

      // 👉 এখানে তুমি নিজের TikTok song link বসাবে
      const tiktokLink = "https://www.tiktok.com/@example/video/123456789";

      // Optional: direct audio file link (mp3)
      const audioUrl = ""; // চাইলে mp3 direct link বসাতে পারো

      if (audioUrl) {
        const filePath = path.join(__dirname, "cache", `bkv_${Date.now()}.mp3`);

        const res = await axios({
          url: audioUrl,
          method: "GET",
          responseType: "stream"
        });

        const writer = fs.createWriteStream(filePath);
        res.data.pipe(writer);

        writer.on("finish", async () => {
          await api.sendMessage(
            {
              body: "💔 Broken song playing...",
              attachment: fs.createReadStream(filePath)
            },
            event.threadID
          );

          fs.unlinkSync(filePath);
        });

        writer.on("error", () => {
          api.sendMessage(`💔 Broken song: ${tiktokLink}`, event.threadID);
        });

      } else {
        // fallback: just send link
        return api.sendMessage(
          `💔 Broken Song 🎧\nListen here: ${tiktokLink}`,
          event.threadID
        );
      }

    } catch (e) {
      console.log(e);
    }
  }
};
