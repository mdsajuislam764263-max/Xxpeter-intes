const fs = require("fs");
const path = "./data/users.json";

function load() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");
  return JSON.parse(fs.readFileSync(path));
}

function save(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
  config: {
    name: "horse",
    version: "1.0",
    role: 0,
    shortDescription: "Horse racing betting game"
  },

  onStart: async function ({ event, message, args }) {
    const db = load();
    const id = event.senderID;

    if (!db[id]) db[id] = { coin: 0 };

    let pick = parseInt(args[0]);
    let bet = parseInt(args[1]);

    if (!pick || pick < 1 || pick > 3) {
      return message.reply("🐎 Choose horse (1 / 2 / 3)\nExample: .horse 2 50");
    }

    if (!bet || bet <= 0) {
      return message.reply("💰 Enter valid bet amount");
    }

    if (db[id].coin < bet) {
      return message.reply("❌ Not enough coins");
    }

    // deduct bet
    db[id].coin -= bet;

    message.reply("🏁 Race starting...\n🐎 1 | 🐎 2 | 🐎 3");

    // random winner
    let winner = Math.floor(Math.random() * 3) + 1;

    setTimeout(() => {
      if (pick === winner) {
        let winAmount = bet * 2;
        db[id].coin += winAmount;

        message.reply(`🏆 Horse ${winner} wins!\n🎉 You won ${winAmount} coins`);
      } else {
        message.reply(`💀 Horse ${winner} wins!\n❌ You lost ${bet} coins`);
      }

      save(db);
    }, 3000);
  }
};
