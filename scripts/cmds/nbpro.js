const fs = require("fs");
const axios = require("axios");
const sharp = require("sharp");

module.exports = {
  config: {
    name: "nbpro",
    version: "14.0",
    aliases: ["edit", "nb"],
    category: "ai",
    role: 0,
    countDown: 2
  },

  onStart: async function ({ message, event, args }) {

    const choice = parseInt(args[0]);

    if (!choice) {
      return message.reply(
`🎨 AI IMAGE EDITOR V14

👉 Use: edit <1-25> (reply image)

1 Resize | 2 Blur | 3 Gray | 4 Rotate | 5 Flip
6 Bright | 7 Invert | 8 Sharp | 9 Cartoon | 10 Oil
11 Bright+ | 12 Contrast | 13 Saturation | 14 Hue
15 Pixelate | 16 BG White | 17 FaceBlur | 18 BG White
19 HDR | 20 Glow | 21 Vintage | 22 Sketch | 23 Watercolor
24 Neon | 25 Restore`
      );
    }

    const imgUrl = event.messageReply?.attachments?.[0]?.url;

    if (!imgUrl) {
      return message.reply("❌ Please reply to an image.");
    }

    try {

      // 🔥 download image safely
      const res = await axios.get(imgUrl, {
        responseType: "arraybuffer",
        timeout: 20000
      });

      const input = Buffer.from(res.data);

      let img = sharp(input);

      const meta = await img.metadata();
      if (!meta?.width) {
        return message.reply("❌ Invalid image file.");
      }

      switch (choice) {

        case 1:
          img = img.resize(600);
          break;

        case 2:
          img = img.blur(20);
          break;

        case 3:
          img = img.grayscale();
          break;

        case 4:
          img = img.rotate(180);
          break;

        case 5:
          img = img.flip();
          break;

        case 6:
          img = img.modulate({ brightness: 1.5 });
          break;

        case 7:
          img = img.negate();
          break;

        case 8:
          img = img.sharpen(4);
          break;

        case 9:
          img = img
            .modulate({ saturation: 2.5, brightness: 1.2 })
            .sharpen()
            .posterize(6);
          break;

        case 10:
          img = img.blur(3).modulate({ saturation: 1.6 });
          break;

        case 11:
          img = img.modulate({ brightness: 2.2 });
          break;

        case 12:
          img = img.linear(1.6, -30);
          break;

        case 13:
          img = img.modulate({ saturation: 3 });
          break;

        case 14:
          img = img.modulate({ hue: 180 });
          break;

        case 15:
          img = img
            .resize(100, 100)
            .resize(600, 600, { kernel: sharp.kernel.nearest });
          break;

        case 16:
          img = img.flatten({ background: "#ffffff" });
          break;

        case 17:
          img = img.blur(30);
          break;

        case 18:
          img = img.flatten({ background: "#ffffff" });
          break;

        case 19:
          img = img.sharpen().modulate({ contrast: 1.8, brightness: 1.3 });
          break;

        case 20:
          img = img.blur(6).modulate({ brightness: 2.2 });
          break;

        case 21:
          img = img.tint({ r: 160, g: 110, b: 80 });
          break;

        case 22:
          img = img.grayscale().sharpen(3);
          break;

        case 23:
          img = img.modulate({ saturation: 0.35 });
          break;

        case 24:
          img = img.tint({ r: 255, g: 0, b: 255 });
          break;

        case 25:
          img = img;
          break;
      }

      const out = `edited_${Date.now()}.jpg`;
      await img.toFile(out);

      const stream = fs.createReadStream(out);

      const msg = await message.reply({
        body: `✅ Tool ${choice} applied successfully`,
        attachment: stream
      });

      // 🧹 cleanup file
      setTimeout(() => {
        try {
          fs.unlinkSync(out);
        } catch {}
      }, 10000);

    } catch (err) {
      return message.reply("❌ Error: " + err.message);
    }
  }
};
