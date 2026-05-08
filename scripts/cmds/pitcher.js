// pitchergame.js
// SIMPLE PITCHER GAME - ALL CODE IN ONE FILE

module.exports = {
  config: {
    name: "pitcher",
    version: "1.0",
    author: "Saju",
    role: 0,
    category: "game"
  },

  onStart: async function () {
    console.log("⚾ Pitcher Game Ready");
  },

  onChat: async function ({ api, event }) {
    try {

      const msg = (event.body || "").toLowerCase().trim();

      // START GAME
      if (msg === "pitcher") {

        const text =
`⚾ PITCHER GAME ⚾

Choose a number:
1️⃣ Fast Ball
2️⃣ Curve Ball
3️⃣ Fire Ball

Reply:
pitch 1
pitch 2
pitch 3
`;

        return api.sendMessage(text, event.threadID);
      }

      // GAME COMMAND
      if (msg.startsWith("pitch")) {

        const choose = msg.split(" ")[1];

        if (!choose) {
          return api.sendMessage(
            "❌ Use:\npitch 1\npitch 2\npitch 3",
            event.threadID
          );
        }

        const random = Math.floor(Math.random() * 3) + 1;

        let playerMove = "";
        let botMove = "";

        // PLAYER MOVE
        if (choose === "1") playerMove = "⚡ Fast Ball";
        if (choose === "2") playerMove = "🌀 Curve Ball";
        if (choose === "3") playerMove = "🔥 Fire Ball";

        // BOT MOVE
        if (random === 1) botMove = "⚡ Fast Ball";
        if (random === 2) botMove = "🌀 Curve Ball";
        if (random === 3) botMove = "🔥 Fire Ball";

        // RESULT
        let result = "";

        if (parseInt(choose) === random) {
          result = "🎉 YOU WIN!";
        } else {
          result = "💀 YOU LOSE!";
        }

        const final =
`╔════════════╗
   ⚾ PITCHER GAME ⚾
╚════════════╝

👤 YOU:
${playerMove}

🤖 BOT:
${botMove}

🏆 RESULT:
${result}
`;

        return api.sendMessage(final, event.threadID);
      }

    } catch (e) {
      console.log("PITCHER GAME ERROR:", e);
    }
  }
};
