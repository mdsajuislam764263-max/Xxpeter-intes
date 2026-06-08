const axios = require("axios");

const usedJokes = new Set();

// ================= ONLINE JOKE =================
async function getJoke() {
  try {
    const res = await axios.get("https://official-joke-api.appspot.com/jokes/random");

    const joke = `😂 ${res.data.setup}\n👉 ${res.data.punchline}`;

    if (usedJokes.has(joke)) return await getJoke();

    usedJokes.add(joke);

    if (usedJokes.size > 100) usedJokes.clear();

    return joke;

  } catch {
    const fallback = [
      "😂 আমি পড়তে বসেছিলাম… WiFi আমাকে ডেকে নিলো!",
      "😆 পড়াশোনা করলে ঘুম আসে, ঘুমালে পড়াশোনা আসে না!",
      "🤣 মা: পড়ো! আমি: পরে করবো 😴"
    ];

    return fallback[Math.floor(Math.random() * fallback.length)];
  }
}

// ================= LIVE TIME =================
function getTime() {
  const now = new Date();

  return now.toLocaleString("bn-BD", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
}

module.exports = {
  config: {
    name: "assistant",
    version: "5.0",
    author: "ChatGPT",
    role: 0,
    category: "ai",
    countDown: 3
  },

  onStart: async function ({ message, args }) {

    const cmd = (args[0] || "").toLowerCase();

    // ================= HELP =================
    if (!cmd || cmd === "help") {
      return message.reply(
`🤖 SMART ASSISTANT BOT

Commands:
assistant joke
assistant time
assistant ping
assistant help`
      );
    }

    // ================= LIVE JOKE =================
    if (cmd === "joke") {
      const joke = await getJoke();

      return message.reply(
`📰 ONLINE FUNNY JOKE

${joke}`
      );
    }

    // ================= LIVE TIME =================
    if (cmd === "time") {
      return message.reply(
`⏰ LIVE BANGLADESH TIME

🕒 ${getTime()}`
      );
    }

    // ================= PING =================
    if (cmd === "ping") {
      const start = Date.now();
      await message.reply("⏳ Checking...");
      const end = Date.now();

      return message.reply(`⚡ Bot Speed: ${end - start}ms`);
    }

    return message.reply("❌ ভুল কমান্ড। assistant help লিখো");
  }
};
