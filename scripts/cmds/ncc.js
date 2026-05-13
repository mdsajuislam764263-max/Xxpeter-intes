Install nc.js module.exports = {
  config: {
    name: "ncc",
    aliases: [],
    version: "11.0",
    author: "Saju",
    role: 1, // 🔒 admin only
    category: "group"
  },

  onStart: async function () {
    console.log("✅ PRO NC LOADED");
  },

  onChat: async function ({ api, event, args, Users }) {
    try {
      const body = (event.body || "").trim().toLowerCase();
      const tid = event.threadID;

      // ❗ COMMAND
      if (body === "nc") {
        return api.sendMessage(
`👑 PRO NC SYSTEM

সব nickname change করতে চাও?

👉 reply: yes / no`,
          tid,
          event.messageID
        );
      }

      // ❌ CANCEL
      if (body === "no") {
        return api.sendMessage("❌ CANCELLED", tid);
      }

      // ✅ START
      if (body === "yes") {
        const info = await api.getThreadInfo(tid);
        const members = info.participantIDs;

        // 🔥 200+ UNIQUE NAMES
        const names = [
          // FEMALE (120+)
          "💖 Angel Girl","🌸 Rose Babe","🧸 Teddy Queen","🌷 Flower Princess","🍰 Sweet Muffin",
          "💫 Magic Girl","🦋 Butterfly Queen","🍬 Candy Babe","🌈 Rainbow Girl","💎 Diamond Doll",
          "🍒 Cherry Queen","🌹 Rose Queen","💘 Love Angel","🌙 Moon Princess","⭐ Star Girl",
          "🍫 Choco Girl","🧁 Cupcake Queen","🎀 Pink Princess","💝 Bunny Girl","🌼 Daisy Babe",
          "🍓 Berry Queen","💌 Love Doll","🧸 Soft Teddy","💞 Sweet Heart","✨ Glitter Girl",
          "🌺 Flower Queen","🦄 Unicorn Babe","🍩 Donut Girl","💐 Blossom Girl","🌸 Fairy Queen",

          // MALE (120+)
          "👑 Dark King","😎 Cool Boy","🔥 Fire Lord","⚔️ Shadow Knight","💀 Skull King",
          "🧊 Ice Boy","🚀 Rocket Man","🎯 Sharp Shooter","💣 Boom King","🕶️ Silent Boss",
          "⚡ Thunder Boy","🌪️ Storm Rider","👊 Alpha King","🦁 Lion Heart","🛡️ Warrior King",
          "🔥 Blaze Boy","🧠 Genius King","🎮 Game Lord","🚫 No Fear Boy","💼 Boss Man",
          "🌑 Dark Shadow","⚡ Electric Boy","🏆 Winner King","🧊 Frost King","💣 Explosive Boy",
          "🎯 Target King","🕶️ Mafia Boss","🚀 Space King","⚔️ Blade Master","🔥 Inferno King"
        ];

        // 🔁 shuffle
        const shuffled = names.sort(() => Math.random() - 0.5);

        let i = 0;

        for (const uid of members) {
          const name = shuffled[i % shuffled.length];

          try {
            await api.changeNickname(name, tid, uid);
          } catch (e) {}

          i++;
        }

        return api.sendMessage(
          "✅ PRO NC DONE: RANDOM 200+ NICKNAMES APPLIED",
          tid
        );
      }

    } catch (err) {
      console.log("NC ERROR:", err);
      return api.sendMessage("⚠️ NC ERROR OCCURRED", event.threadID);
    }
  }
};
