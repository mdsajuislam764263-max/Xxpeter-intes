// adminsaju.js
// ULTRA ADMIN PANEL + TEMP NUMBER + FUN/AI FULL VERSION

const fs = require('fs');

const ADMIN_IDS = ["61582071385233"]; // শুধু admin use করতে পারবে
const generatedNumbers = [];

function isAdmin(uid) { return ADMIN_IDS.includes(uid); }

module.exports = {
  config: {
    name: "adminsaju",
    version: "11.0",
    author: "Saju",
    role: 0,
    category: "admin"
  },

  onStart: async function () { console.log("🟢 ADMIN PANEL FULL MODULE READY"); },

  onChat: async function({ api, event }) {
    try {
      const uid = event.senderID;
      if (!isAdmin(uid)) return;

      const raw = (event.body || "").trim();
      if (!raw) return;

      // ===== PANEL =====
      if (/^admin panel|panel|adminsaju$/i.test(raw)) {
        const panelUI = `
╔══════════════════════╗
   ☠ ULTRA ADMIN PANEL ☠
╚══════════════════════╝

1️⃣–100️⃣ : ADMIN COMMANDS
101️⃣ : TEMP NUMBER SYSTEM
201️⃣–250️⃣ : FUN / AI COMMANDS

Type number + value
Example:
1 123456789
101 tempgen Hello temp number
201
226 Hello AI
`;
        return api.sendMessage(panelUI, event.threadID);
      }

      // ===== NUMBER BASED COMMANDS =====
      const match = raw.match(/^(\d{1,3})\s*(.*)$/);
      if (match) {
        const num = match[1];
        const value = (match[2] || "").trim();

        // --- ADMIN COMMANDS 1–100 ---
        if (num >= 1 && num <= 100) {
          switch(num) {
            case "1": return api.sendMessage(`⛔ BANNED: ${value}`, event.threadID);
            case "2": return api.sendMessage(`✅ UNBANNED: ${value}`, event.threadID);
            case "3": return api.sendMessage(`👢 KICKED: ${value}`, event.threadID);
            case "4": return api.sendMessage(`🔇 MUTED: ${value}`, event.threadID);
            case "5": return api.sendMessage(`🔊 UNMUTED: ${value}`, event.threadID);
            case "6": return api.sendMessage(`📢 ${value}`, event.threadID);
            // ... add remaining 7–100 simulation messages if needed
            default: return api.sendMessage(`⚙ Command ${num} executed: ${value}`, event.threadID);
          }
        }

        // --- TEMP NUMBER SYSTEM 101 ---
        if (num == "101") {
          const args = value.split(" ");
          const cmd = args[0].toLowerCase();
          const msg = args.slice(1).join(" ");

          if (cmd === "tempgen") {
            const number = '01' + Math.floor(100000000 + Math.random() * 900000000);
            generatedNumbers.push({ number, message: msg });
            return api.sendMessage(`✅ TEMP NUMBER: ${number}\n💬 Message: ${msg}`, event.threadID);
          }
          if (cmd === "templist") {
            if (!generatedNumbers.length) return api.sendMessage("⚠ No temp numbers yet!", event.threadID);
            const list = generatedNumbers.map((item,i)=>`${i+1}: ${item.number} | Msg: ${item.message}`).join("\n");
            return api.sendMessage(`📄 TEMP NUMBERS:\n${list}`, event.threadID);
          }
          if (cmd === "tempsave") {
            const filename = msg || "temp_numbers.txt";
            const data = generatedNumbers.map(item=>item.number + " | " + item.message).join("\n");
            fs.writeFileSync(filename, data);
            return api.sendMessage(`💾 Saved to ${filename}`, event.threadID);
          }
          if (cmd === "tempreset") {
            generatedNumbers.length = 0;
            return api.sendMessage("🧹 All temp numbers cleared!", event.threadID);
          }
          return;
        }

        // --- FUN / AI COMMANDS 201–250 ---
        if (num >= 201 && num <= 250) {
          const funResponses = {
            "201": "🤣 Here's a joke for you!",
            "202": "📸 Sending a random meme...",
            "203": "😎 Friendly roast: You're too cool!",
            "204": "💖 Compliment: You are awesome!",
            "205": "💬 Motivational quote: Keep going!",
            "206": "🧠 Fun fact: Honey never spoils!",
            "207": "❓ Riddle: What has keys but can't open locks?",
            "208": "📖 Short story: Once upon a time...",
            "209": "🎯 Dare: Do 10 pushups!",
            "210": "🔍 Truth question: What's your favorite color?",
            "211": "😀 Random emoji: 😎🤩😂",
            "212": "📌 Sticker sent!",
            "213": "🎬 GIF sent!",
            "214": "🎵 Song suggestion: Imagine - John Lennon",
            "215": "🎥 Video suggestion: Funny cats compilation",
            "216": "🖼 Image suggestion: Beautiful sunset",
            "217": "🎞 Movie recommendation: Inception",
            "218": "🎮 Game suggestion: Among Us",
            "219": "🍔 Food suggestion: Pizza",
            "220": "🎨 Random color: Neon Blue",
            "221": "🐱 Random animal fact: Cats sleep 12–16 hours!",
            "222": "🎉 Birthday wish: Happy Birthday!",
            "223": "💃 Dance animation sent!",
            "224": "🤗 Hug sent!",
            "225": "😘 Kiss sent!",
            "226": "💬 AI says: Hello! How can I help you?",
            "227": "🧠 AI answer: That's a great question!",
            "228": "🌐 Translate: [Your text here]",
            "229": "✏ Summarize: This text is summarized...",
            "230": "📖 Define: Word definition goes here",
            "231": "🔤 Spell: Correct spelling suggestion",
            "232": "✊✋✌ Rock Paper Scissors game started!",
            "233": "🔮 Daily horoscope: Good luck today!",
            "234": "🌤 Weather info: Sunny 25°C",
            "235": "📰 Latest news headline: ...",
            "236": "➗ Math solution: 2+2=4",
            "237": "🔄 Convert units/currency: ...",
            "238": "📚 Wiki info: ...",
            "239": "⏰ Reminder: You set a reminder!",
            "240": "⏳ Countdown started!",
            "241": "🤣 AI joke generated!",
            "242": "📖 AI short story generated!",
            "243": "📝 AI poem generated!",
            "244": "🎵 AI song suggestion!",
            "245": "❓ AI tricky riddle!",
            "246": "💬 AI casual chat!",
            "247": "😀 AI emoji combo: 😎🤩😂",
            "248": "🖌 AI art suggestion!",
            "249": "🎥 AI movie recommendation!",
            "250": "💡 AI random fun fact!"
          };
          if (funResponses[num]) return api.sendMessage(funResponses[num], event.threadID);
        }
      }
    } catch(e) {
      console.log("ADMIN PANEL FULL ERROR:", e);
    }
  }
};
