const { createCanvas, loadImage } = require("canvas");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "wcm",
    version: "3.1",
    author: "Saju",
    description: "Beautiful image-based welcome card + message with @mention + sender name",
    usage: "wcm @mention"
  },

  onStart: async function({ api, event }) {
    try {
      // ================= Check @mention =================
      if (Object.keys(event.mentions).length === 0) {
        return api.sendMessage("❌ কাকে welcome করতে চাও? @mention দাও।", event.threadID, event.messageID);
      }

      const targetID = Object.keys(event.mentions)[0];
      const name = event.mentions[targetID];

      const cacheFolder = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolder)) fs.mkdirSync(cacheFolder);

      // ================= Download profile pic =================
      const profileUrl = `https://graph.facebook.com/${targetID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const picRes = await axios.get(profileUrl, { responseType: "arraybuffer" });
      const profilePath = path.join(cacheFolder, `wcm_profile_${targetID}.png`);
      fs.writeFileSync(profilePath, picRes.data);
      const profileImg = await loadImage(profilePath);

      // ================= Create Canvas =================
      const width = 900;
      const height = 500;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#ffecd2");
      gradient.addColorStop(1, "#fcb69f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle shadow behind text
      ctx.shadowColor = "rgba(0,0,0,0.2)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;

      // Circular profile pic
      const picSize = 180;
      const picX = 50;
      const picY = (height - picSize) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(picX + picSize / 2, picY + picSize / 2, picSize / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(profileImg, picX, picY, picSize, picSize);
      ctx.restore();

      // ================= Stylish Text =================
      const startX = 260;
      ctx.fillStyle = "#fff";

      ctx.font = "bold 48px Arial";
      ctx.fillText(`🌸 Welcome, ${name}! 🌸`, startX, 150);

      ctx.font = "32px Arial";
      ctx.fillText("🎀 We're thrilled to have you here! 🎀", startX, 220);
      ctx.fillText("💫 Enjoy your time & share lovely moments 🥰", startX, 280);
      ctx.fillText("✨ Let's make this place shine together! ✨", startX, 340);

      // Extra decoration emojis at bottom
      ctx.font = "40px Arial";
      ctx.fillText("💖💖💖💖💖💖", startX, 420);

      // Your Name at the bottom of the card
      ctx.font = "bold 28px Arial";
      ctx.fillText("— 𝒎𝒅..𝒔𝒂𝒋𝒖..𝒊𝒔𝒍𝒂𝒎 ✨💖", width - 480, height - 30);

      // Save canvas
      const outPath = path.join(cacheFolder, `wcm_card_${targetID}.png`);
      fs.writeFileSync(outPath, canvas.toBuffer());

      // ================= Message Text =================
      const message = 
`💌 হ্যালো ${name}!\n\n` +
`🌸 তোমাকে স্বাগতম! 🎉\n` +
`💫 আমরা খুব আনন্দিত তোমাকে এখানে পেয়ে! 🥰\n` +
`✨ মজা করো, আনন্দ ভাগ করো এবং সুন্দর মুহূর্ত উপভোগ করো! 💖\n\n` +
`— 𝒎𝒅..𝒔𝒂𝒋𝒖..𝒊𝒔𝒍𝒂𝒎 ✨💖`;

      // ================= Send Message =================
      api.sendMessage(
        { body: message, attachment: fs.createReadStream(outPath) },
        event.threadID,
        () => fs.unlinkSync(outPath),
        event.messageID
      );

    } catch (err) {
      console.error(err);
      api.sendMessage("❌ কিছু সমস্যা হয়েছে welcome card তৈরি করতে।", event.threadID, event.messageID);
    }
  }
};
