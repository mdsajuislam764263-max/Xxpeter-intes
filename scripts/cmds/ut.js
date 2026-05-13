const { createCanvas, registerFont, loadImage } = require("canvas");
const fs = require("fs");
const os = require("os");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "ut",
    aliases: ["ut", "status", "system"],
    version: "6.0",
    author: "𝒔𝒂𝒋𝒖 𝒊𝒔𝒍𝒂𝒎",
    role: 0,
    shortDescription: {
      en: "Ultra Hacker System"
    },
    category: "system"
  },

  onStart: async function ({
    message,
    event,
    usersData
  }) {

    try {

      /* =========================
         FONT LOAD SAFE
      ========================= */

      try {

        const fontDir = path.join(
          __dirname,
          "fonts"
        );

        registerFont(
          path.join(
            fontDir,
            "CourierPrime-Bold.ttf"
          ),
          {
            family: "Hacker"
          }
        );

      } catch {}

      /* =========================
         USER INFO
      ========================= */

      const uid = event.senderID;

      let name = "Unknown User";

      try {
        const data = await usersData.get(uid);
        name = data.name || "Unknown";
      } catch {}

      /* =========================
         AVATAR SAFE
      ========================= */

      let avatar =
        "https://i.imgur.com/3ZUrjUP.png";

      try {
        avatar =
          await usersData.getAvatarUrl(uid);
      } catch {}

      /* =========================
         SYSTEM INFO
      ========================= */

      const cpu =
        Math.floor(Math.random() * 50) + 20;

      const ram = Math.floor(
        ((os.totalmem() - os.freemem()) /
          os.totalmem()) *
          100
      );

      const disk =
        Math.floor(Math.random() * 40) + 30;

      const ping =
        Math.floor(Math.random() * 80) + 20;

      const temp =
        Math.floor(Math.random() * 20) + 40;

      const sec = process.uptime();

      const h = Math.floor(sec / 3600);

      const m = Math.floor(
        (sec % 3600) / 60
      );

      const s = Math.floor(sec % 60);

      const uptime =
        `${h}H ${m}M ${s}S`;

      /* =========================
         CREATE CANVAS
      ========================= */

      const W = 1400;

      const H = 900;

      const canvas =
        createCanvas(W, H);

      const ctx =
        canvas.getContext("2d");

      /* =========================
         BACKGROUND
      ========================= */

      const bg =
        ctx.createLinearGradient(
          0,
          0,
          W,
          H
        );

      bg.addColorStop(0, "#000000");

      bg.addColorStop(1, "#001100");

      ctx.fillStyle = bg;

      ctx.fillRect(0, 0, W, H);

      /* ===== MATRIX ===== */

      ctx.font = "20px sans-serif";

      for (let i = 0; i < 250; i++) {

        ctx.fillStyle =
          `rgba(0,255,0,${
            Math.random()
          })`;

        ctx.fillText(
          Math.random()
            .toString(16)
            .substring(2, 8),

          Math.random() * W,

          Math.random() * H
        );
      }

      /* =========================
         BORDER
      ========================= */

      ctx.strokeStyle = "#00ff66";

      ctx.lineWidth = 4;

      ctx.strokeRect(
        20,
        20,
        W - 40,
        H - 40
      );

      /* =========================
         HEADER
      ========================= */

      ctx.textAlign = "center";

      ctx.font =
        "bold 60px sans-serif";

      ctx.fillStyle = "#00ff66";

      ctx.fillText(
        "SYSTEM TERMINAL",
        W / 2,
        100
      );

      ctx.font =
        "28px sans-serif";

      ctx.fillStyle = "#00cc88";

      ctx.fillText(
        ">>> HACKER STATUS PANEL <<<",
        W / 2,
        150
      );

      /* =========================
         AVATAR
      ========================= */

      try {

        const avatarImg =
          await loadImage(avatar);

        ctx.save();

        ctx.beginPath();

        ctx.arc(
          180,
          280,
          100,
          0,
          Math.PI * 2
        );

        ctx.closePath();

        ctx.clip();

        ctx.drawImage(
          avatarImg,
          80,
          180,
          200,
          200
        );

        ctx.restore();

        ctx.strokeStyle =
          "#00ff66";

        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.arc(
          180,
          280,
          103,
          0,
          Math.PI * 2
        );

        ctx.stroke();

      } catch {}

      /* =========================
         USER DETAILS
      ========================= */

      ctx.textAlign = "left";

      ctx.font =
        "bold 35px sans-serif";

      ctx.fillStyle = "#00ff99";

      ctx.fillText(
        `USER : ${name}`,
        350,
        250
      );

      ctx.fillText(
        `UID : ${uid}`,
        350,
        320
      );

      ctx.fillText(
        `PLATFORM : ${os.platform().toUpperCase()}`,
        350,
        390
      );

      ctx.fillText(
        `CORES : ${os.cpus().length}`,
        350,
        460
      );

      ctx.fillText(
        `NODE : ${process.version}`,
        350,
        530
      );

      /* =========================
         BAR FUNCTION
      ========================= */

      const drawBar = (
        x,
        y,
        value,
        text,
        color
      ) => {

        ctx.font =
          "28px sans-serif";

        ctx.fillStyle =
          "#00ff88";

        ctx.fillText(
          text,
          x,
          y
        );

        ctx.fillStyle =
          "#003300";

        ctx.fillRect(
          x,
          y + 20,
          400,
          35
        );

        ctx.fillStyle =
          color;

        ctx.fillRect(
          x,
          y + 20,
          (value / 100) * 400,
          35
        );

        ctx.strokeStyle =
          "#00ff66";

        ctx.strokeRect(
          x,
          y + 20,
          400,
          35
        );

        ctx.fillStyle =
          "#ffffff";

        ctx.fillText(
          `${value}%`,
          x + 430,
          y + 45
        );
      };

      drawBar(
        820,
        250,
        cpu,
        "CPU LOAD",
        "#00ff66"
      );

      drawBar(
        820,
        380,
        ram,
        "RAM USAGE",
        "#00ccff"
      );

      drawBar(
        820,
        510,
        disk,
        "DISK USAGE",
        "#ff00ff"
      );

      /* =========================
         EXTRA INFO
      ========================= */

      ctx.font =
        "bold 35px sans-serif";

      ctx.fillStyle =
        "#ffff00";

      ctx.fillText(
        `TEMP : ${temp}°C`,
        100,
        720
      );

      ctx.fillStyle =
        "#00ffff";

      ctx.fillText(
        `PING : ${ping}ms`,
        450,
        720
      );

      ctx.fillStyle =
        "#ff4444";

      ctx.fillText(
        `UPTIME : ${uptime}`,
        800,
        720
      );

      ctx.fillStyle =
        "#00ff66";

      ctx.textAlign =
        "center";

      ctx.fillText(
        "<<< SYSTEM ONLINE >>>",
        W / 2,
        840
      );

      /* =========================
         SAVE IMAGE
      ========================= */

      const cache =
        path.join(
          __dirname,
          "cache"
        );

      if (
        !fs.existsSync(cache)
      ) {
        fs.mkdirSync(cache, {
          recursive: true
        });
      }

      const imgPath =
        path.join(
          cache,
          `up_${Date.now()}.png`
        );

      fs.writeFileSync(
        imgPath,
        canvas.toBuffer()
      );

      /* =========================
         VIDEO DOWNLOAD SAFE
      ========================= */

      let attachments = [
        fs.createReadStream(imgPath)
      ];

      try {

        const videoUrl =
          "https://files.catbox.moe/6r0l6w.mp4";

        const videoPath =
          path.join(
            cache,
            `video_${Date.now()}.mp4`
          );

        const res =
          await axios({
            url: videoUrl,
            method: "GET",
            responseType:
              "stream"
          });

        const writer =
          fs.createWriteStream(
            videoPath
          );

        res.data.pipe(writer);

        await new Promise(
          (
            resolve,
            reject
          ) => {

            writer.on(
              "finish",
              resolve
            );

            writer.on(
              "error",
              reject
            );
          }
        );

        attachments.push(
          fs.createReadStream(
            videoPath
          )
        );

      } catch (e) {

        console.log(
          "Video Failed"
        );
      }

      /* =========================
         SEND MESSAGE
      ========================= */

      await message.reply({
        body:
`╔══════════════════╗
║ ⚡ SYSTEM ONLINE
╠══════════════════╣
║ 👤 USER : ${name}
║ 🧠 CPU : ${cpu}%
║ 💾 RAM : ${ram}%
║ 💽 DISK : ${disk}%
║ 🌡️ TEMP : ${temp}°C
║ 📡 PING : ${ping}ms
║ ⏱️ UPTIME : ${uptime}
╚══════════════════╝`,

        attachment:
          attachments
      });

      /* =========================
         AUTO DELETE
      ========================= */

      setTimeout(() => {

        if (
          fs.existsSync(
            imgPath
          )
        ) {
          fs.unlinkSync(
            imgPath
          );
        }

      }, 20000);

    } catch (err) {

      console.log(err);

      return message.reply(
        "❌ SYSTEM TERMINAL FAILED"
      );
    }
  }
};
