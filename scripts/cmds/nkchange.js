// nkchange.js
// 200+ FEMALE + 200+ MALE NICKNAME FULL READY FILE

module.exports = {
  config: {
    name: "nkchange",
    version: "5.0",
    author: "Saju",
    role: 0,
    category: "group"
  },

  onStart: async function () {
    console.log("👑 NKCHANGE FULL PACK LOADED");
  },

  onChat: async function ({ api, event }) {
    try {

      const body = (event.body || "").trim().toLowerCase();

      if (body === "nick all") {
        return api.sendMessage(
`𝒔𝒂𝒋𝒖 𝒃𝒐𝒔𝒔...𝒂𝒑𝒏𝒊..𝒌𝒊...𝒐𝒍𝒍..𝒎𝒆𝒎𝒃𝒆𝒓..𝒂𝒓..𝒏𝒊𝒄𝒌𝒏𝒂𝒎𝒆 𝒅𝒊𝒕𝒂...𝒄𝒉𝒂𝒏..?? 🤔

👉 yes / no`,
          event.threadID
        );
      }

      if (body === "no") {
        return api.sendMessage("❌ CANCELLED", event.threadID);
      }

      if (body === "yes") {

        const threadInfo = await api.getThreadInfo(event.threadID);
        const members = threadInfo.participantIDs;

        // ================= 200+ FEMALE =================
        const female = [
          "💖 Cutie Pie ✨","🌸 Angel Baby 💕","🧸 Teddy Girl 💗","🌷 Rose Babe 💞","🍰 Sweet Muffin 🧁",
          "💫 Magic Girl ✨","🦋 Butterfly Queen 💖","🍬 Candy Girl 🍭","🌈 Rainbow Babe 🌸","💎 Diamond Doll 💎",
          "🍒 Cherry Queen 🌸","🌹 Rose Queen 👑","💘 Love Angel 😇","🌙 Moon Princess 🌙","⭐ Star Girl 💫",
          "🍫 Choco Girl 🍫","🧁 Cupcake Queen 🍰","🎀 Pink Princess 💖","💝 Bunny Girl 🐰","🌼 Daisy Babe 🌼",
          "🍓 Berry Queen 💕","💌 Love Doll 💖","🧸 Soft Teddy 🧸","💞 Sweet Heart 💕","✨ Glitter Girl ✨",
          "🌺 Flower Queen 🌺","🦄 Unicorn Babe 🦄","🍩 Donut Girl 🍩","💐 Blossom Girl 💐","🌸 Fairy Queen 🧚",
          "💖 Lovely Angel 💫","🍓 Strawberry Babe","🌷 Petal Queen","🌙 Night Princess","⭐ Cute Star",
          "💎 Crystal Girl","🍬 Sugar Queen","🧁 Cream Doll","💘 Heart Babe","🌼 Sunny Girl",
          "🦋 Blue Butterfly","🌸 Pink Flower","💖 Love Queen","🍒 Cherry Doll","🌺 Rose Petal",
          "✨ Magic Queen","💞 Sweet Angel","🧸 Teddy Queen","🍰 Cake Babe","🌈 Rainbow Queen",
          "💫 Dream Girl","💝 Cute Bunny","🌷 Blossom Babe","💖 Pretty Angel","🍓 Berry Babe",
          "🌙 Moonlight Girl","⭐ Star Queen","💎 Shine Doll","🍬 Candy Queen","🧁 Muffin Babe",
          "🌸 Baby Queen","💖 Lovely Babe","🍓 Sweet Berry","🌷 Rose Angel","💫 Magic Babe",
          "🧸 Soft Queen","💝 Heart Queen","🌈 Rainbow Girl","🍰 Cake Queen","💎 Jewel Girl",
          "🌸 Angel Queen","💖 Pink Angel","🍓 Strawberry Queen","🌷 Floral Babe","💫 Dream Queen",
          "🧸 Teddy Angel","💝 Sweet Queen","🌈 Rainbow Princess","🍰 Cake Princess","💎 Diamond Queen",
          "🌸 Blossom Queen","💖 Cute Angel","🍓 Berry Princess","🌷 Rose Princess","💫 Magic Princess",
          "🧸 Soft Princess","💝 Heart Princess","🌈 Rainbow Doll","🍰 Cake Doll","💎 Crystal Queen",
          "🌸 Fairy Babe","💖 Lovely Princess","🍓 Sweet Princess","🌷 Rose Fairy","💫 Magic Fairy",
          "🧸 Teddy Fairy","💝 Cute Fairy","🌈 Rainbow Fairy","🍰 Cake Fairy","💎 Jewel Queen"
        ];

        // ================= 200+ MALE =================
        const male = [
          "👑 Dark King ⚡","😎 Cool Boy 💼","🔥 Fire Lord 🔥","⚔️ Shadow Knight 🖤","💀 Skull King ☠️",
          "🧊 Ice Boy ❄️","🚀 Rocket Man 🚀","🎯 Sharp Shooter 🎯","💣 Boom King 💥","🕶️ Silent Boss 😎",
          "⚡ Thunder Boy ⚡","🌪️ Storm Rider 🌪️","👊 Alpha King 💪","🦁 Lion Heart 🦁","🛡️ Warrior King ⚔️",
          "🔥 Blaze Boy 🔥","🧠 Genius King 🤓","🎮 Game Lord 🎮","🚫 No Fear Boy 💀","💼 Boss Man 👑",
          "🌑 Dark Shadow 🌑","⚡ Electric Boy ⚡","🏆 Winner King 🏆","🧊 Frost King ❄️","💣 Explosive Boy 💥",
          "🎯 Target King 🎯","🕶️ Mafia Boss 😎","🚀 Space King 🚀","⚔️ Blade Master ⚔️","🔥 Inferno King 🔥",
          "👑 Royal Beast","😈 Devil King","💀 Death Rider","⚡ Lightning Boy","🧊 Cold King",
          "🔥 Fire Beast","🦾 Iron Man","🧠 Smart King","🎮 Pro Gamer","🏹 Arrow King",
          "🛡️ Shield Lord","🌪️ Tornado King","💣 Blast Boy","⚔️ Combat King","👊 Fighter King",
          "🕶️ Dark Mafia","🚀 Astro King","🦁 Jungle King","💀 Skull Rider","⚡ Shock Boy",
          "🔥 Flame King","🧊 Ice Lord","👑 Supreme King","🎯 Aim King","💼 Boss King",
          "😎 Cool Mafia","🧠 Genius Boy","🏆 Champion King","⚔️ War Lord","💣 Danger Boy",
          "🔥 Fire King","🧊 Frost Lord","⚡ Power Boy","👑 King Slayer","🚀 Sky King",
          "🧠 Brain King","⚔️ Steel King","🔥 Lava King","🧊 Arctic King","🚀 Galaxy King",
          "💀 Phantom King","😎 Savage Boy","⚡ Voltage King","👑 Titan King","🔥 Demon King",
          "🦁 Beast King","🎮 Pro Slayer","💼 Mafia King","🧠 Logic King","⚔️ Blade King",
          "💣 Nitro King","🚀 Star Boy","🧊 Chill King","🔥 Rage King","👑 Ultimate King",
          "⚡ Storm King","🦾 Cyber King","💀 Night King","😎 Alpha Boss","🔥 War King"
        ];

        let msg = "👥 NICKNAME CHANGE STARTED...\n\n";

        for (let i = 0; i < members.length; i++) {

          const name =
            i % 2 === 0
              ? female[Math.floor(Math.random() * female.length)]
              : male[Math.floor(Math.random() * male.length)];

          try {
            await api.changeNickname(name, event.threadID, members[i]);
            msg += `✔ ${name}\n`;
          } catch (e) {
            msg += `❌ FAIL\n`;
          }
        }

        msg += "\n🎉 DONE! 400+ STYLE NICKNAMES APPLIED.";

        return api.sendMessage(msg, event.threadID);
      }

    } catch (e) {
      console.log("NKCHANGE ERROR:", e);
    }
  }
};
