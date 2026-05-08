// adminsaju.js
// ULTRA STYLISH PANEL + FULL COMMAND EXECUTION

const fs = require('fs');

const ADMIN_IDS = ["61582071385233"]; // Admin only
const generatedNumbers = [];

function isAdmin(uid) { return ADMIN_IDS.includes(uid); }

module.exports = {
  config: {
    name: "adminsaju",
    version: "13.0",
    author: "Saju",
    role: 0,
    category: "admin"
  },

  onStart: async function() {
    console.log("🟢 ULTRA STYLISH ADMIN PANEL READY");
  },

  onChat: async function({ api, event }) {
    try {
      const uid = event.senderID;
      if (!isAdmin(uid)) return;

      const raw = (event.body || "").trim();
      if (!raw) return;

      // ===== SHOW FULL STYLISH PANEL =====
      if (/^all commands|command list|list$/i.test(raw)) {
        const panel = `
╔════════════════════════════════════════════════════╗
        💻🌌 ULTRA STYLISH ADMIN PANEL 🌌💻
╚════════════════════════════════════════════════════╝

⚡ Admin Commands 1–100
────────────────────────────
1️⃣ Ban | 2️⃣ Unban | 3️⃣ Kick | 4️⃣ Mute | 5️⃣ Unmute | 6️⃣ Broadcast
7️⃣–100️⃣ Other admin commands...

⚡ TEMP NUMBER SYSTEM 101
────────────────────────────
101 tempgen <msg>   ⬅ Generate temp number
101 templist        ⬅ List temp numbers
101 tempsave <file> ⬅ Save temp numbers
101 tempreset       ⬅ Reset all temp numbers

⚡ FUN / AI COMMANDS 201–250
────────────────────────────
201 joke | 202 meme | 203 roast | 204 compliment | 205 quote
206 fact | 207 riddle | 208 story | 209 dare | 210 truth
211 emoji | 212 sticker | 213 gif | 214 song | 215 video
216 image | 217 movie | 218 game | 219 food | 220 color
221 animal | 222 birthday | 223 dance | 224 hug | 225 kiss
226 chatai | 227 askai | 228 translate | 229 summarize | 230 define
231 spell | 232 rps | 233 horoscope | 234 weather | 235 news
236 math | 237 convert | 238 wiki | 239 reminder | 240 countdown
241 jokeai | 242 storyai | 243 poem | 244 songai | 245 riddleai
246 chatfun | 247 emojiai | 248 art | 249 movieai | 250 funfact

────────────────────────────
🌟 Type number + value to execute
🌟 Example: 101 tempgen Hello world
🌟 Example: 201
🌟 Example: 226 Hello AI
────────────────────────────
`;
        return api.sendMessage(panel, event.threadID);
      }

      // ===== Number based command execution =====
      const match = raw.match(/^(\d{1,3})\s*(.*)$/);
      if (match) {
        const num = match[1];
        const value = (match[2] || "").trim();

        // --- Admin commands 1–100 ---
        if(num>=1 && num<=100){
          return api.sendMessage(`⚙ Command ${num} executed: ${value}`, event.threadID);
        }

        // --- TEMP NUMBER SYSTEM 101 ---
        if(num=="101"){
          const args = value.split(" ");
          const cmd = args[0].toLowerCase();
          const msg = args.slice(1).join(" ");

          if(cmd==="tempgen"){
            const number = '01'+Math.floor(100000000+Math.random()*900000000);
            generatedNumbers.push({number,message:msg});
            return api.sendMessage(`✅ TEMP NUMBER: ${number}\n💬 Message: ${msg}`, event.threadID);
          }
          if(cmd==="templist"){
            if(!generatedNumbers.length) return api.sendMessage("⚠ No temp numbers yet!",event.threadID);
            const list = generatedNumbers.map((item,i)=>`${i+1}: ${item.number} | Msg: ${item.message}`).join("\n");
            return api.sendMessage(`📄 TEMP NUMBERS:\n${list}`,event.threadID);
          }
          if(cmd==="tempsave"){
            const filename = msg || "temp_numbers.txt";
            const data = generatedNumbers.map(item=>item.number+" | "+item.message).join("\n");
            fs.writeFileSync(filename,data);
            return api.sendMessage(`💾 Saved to ${filename}`,event.threadID);
          }
          if(cmd==="tempreset"){
            generatedNumbers.length=0;
            return api.sendMessage("🧹 All temp numbers cleared!",event.threadID);
          }
          return;
        }

        // --- FUN / AI COMMANDS 201–250 ---
        if(num>=201 && num<=250){
          const funResponses = {
            "201":"🤣 Here's a joke!",
            "202":"📸 Random meme",
            "203":"😎 Friendly roast",
            "204":"💖 Compliment",
            "205":"💬 Motivational quote",
            "206":"🧠 Fun fact",
            "207":"❓ Riddle",
            "208":"📖 Short story",
            "209":"🎯 Dare",
            "210":"🔍 Truth question",
            "211":"😀 Random emoji",
            "212":"📌 Sticker",
            "213":"🎬 GIF",
            "214":"🎵 Song suggestion",
            "215":"🎥 Video suggestion",
            "216":"🖼 Image suggestion",
            "217":"🎞 Movie recommendation",
            "218":"🎮 Game suggestion",
            "219":"🍔 Food suggestion",
            "220":"🎨 Random color",
            "221":"🐱 Random animal fact",
            "222":"🎉 Birthday wish",
            "223":"💃 Dance animation",
            "224":"🤗 Hug",
            "225":"😘 Kiss",
            "226":"💬 AI says: Hello!",
            "227":"🧠 AI answer",
            "228":"🌐 Translate",
            "229":"✏ Summarize",
            "230":"📖 Define",
            "231":"🔤 Spell",
            "232":"✊✋✌ Rock-Paper-Scissors",
            "233":"🔮 Daily horoscope",
            "234":"🌤 Weather info",
            "235":"📰 News headline",
            "236":"➗ Math solution",
            "237":"🔄 Convert units/currency",
            "238":"📚 Wiki info",
            "239":"⏰ Reminder",
            "240":"⏳ Countdown",
            "241":"🤣 AI joke",
            "242":"📖 AI short story",
            "243":"📝 AI poem",
            "244":"🎵 AI song suggestion",
            "245":"❓ AI tricky riddle",
            "246":"💬 AI casual chat",
            "247":"😀 AI emoji combo",
            "248":"🖌 AI art suggestion",
            "249":"🎥 AI movie recommendation",
            "250":"💡 AI fun fact"
          };
          if(funResponses[num]) return api.sendMessage(funResponses[num],event.threadID);
        }
      }

    } catch(e){
      console.log("STYLISH PANEL FULL ERROR:",e);
    }
  }
};
