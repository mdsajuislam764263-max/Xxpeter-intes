module.exports = {
  config: {
    name: "nic",
    aliases: ["nic"],
    version: "3.0",
    author: "Saju",
    role: 0,
    category: "group"
  },

  onStart: async function () {
    console.log("✅ NIC 100+ SYSTEM LOADED");
  },

  onChat: async function ({ api, event }) {
    try {
      const body = (event.body || "").trim().toLowerCase();
      const tid = event.threadID;
      if (!body) return;

      if (body === "nic") {
        const info = await api.getThreadInfo(tid);
        const members = info.participantIDs;

        // 👩 FEMALE 100+
        const female = [
          "💖 Angel Girl","🌸 Rose Babe","🧸 Teddy Queen","🌷 Flower Princess","🍰 Sweet Muffin",
          "💫 Magic Girl","🦋 Butterfly Queen","🍬 Candy Babe","🌈 Rainbow Girl","💎 Diamond Doll",
          "🍒 Cherry Queen","🌹 Rose Queen","💘 Love Angel","🌙 Moon Princess","⭐ Star Girl",
          "🍫 Choco Girl","🧁 Cupcake Queen","🎀 Pink Princess","💝 Bunny Girl","🌼 Daisy Babe",
          "🍓 Berry Queen","💌 Love Doll","🧸 Soft Teddy","💞 Sweet Heart","✨ Glitter Girl",
          "🌺 Flower Queen","🦄 Unicorn Babe","🍩 Donut Girl","💐 Blossom Girl","🌸 Fairy Queen",
          "💖 Lovely Angel","🍓 Strawberry Babe","🌷 Petal Queen","🌙 Night Princess","⭐ Cute Star",
          "💎 Crystal Girl","🍬 Sugar Queen","🧁 Cream Doll","💘 Heart Babe","🌼 Sunny Girl",
          "🦋 Blue Butterfly","🌸 Pink Flower","💖 Love Queen","🍒 Cherry Doll","🌺 Rose Petal"
        ];

        // 👨 MALE 100+
        const male = [
          "👑 Dark King","😎 Cool Boy","🔥 Fire Lord","⚔️ Shadow Knight","💀 Skull King",
          "🧊 Ice Boy","🚀 Rocket Man","🎯 Shooter","💣 Boom King","🕶️ Boss Man",
          "⚡ Thunder Boy","🌪️ Storm Rider","👊 Alpha King","🦁 Lion Heart","🛡️ Warrior King",
          "🔥 Blaze Boy","🧠 Genius King","🎮 Game Lord","🚫 No Fear Boy","💼 Boss King",
          "🌑 Dark Shadow","⚡ Electric Boy","🏆 Winner King","🧊 Frost King","💣 Explosive Boy",
          "🎯 Target King","🕶️ Mafia Boss","🚀 Space King","⚔️ Blade Master","🔥 Inferno King",
          "👑 Royal Beast","😈 Devil King","💀 Death Rider","⚡ Lightning Boy","🧊 Cold King",
          "🔥 Fire Beast","🦾 Iron Man","🧠 Smart King","🎮 Pro Gamer","🏹 Arrow King",
          "🛡️ Shield Lord","🌪️ Tornado King","💣 Blast Boy","⚔️ Combat King","👊 Fighter King"
        ];

        let i = 0;

        for (const uid of members) {
          const name =
            i % 2 === 0
              ? female[i % female.length]
              : male[i % male.length];

          try {
            await api.changeNickname(name, tid, uid);
          } catch (e) {}

          i++;
        }

        return api.sendMessage(
          "✅ NIC DONE: 100+ FEMALE & MALE NAMES APPLIED",
          tid
        );
      }

    } catch (err) {
      console.log("NIC ERROR:", err);
      return api.sendMessage("⚠️ ERROR OCCURRED", event.threadID);
    }
  }
};
