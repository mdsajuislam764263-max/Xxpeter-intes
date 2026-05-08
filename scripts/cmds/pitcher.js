// 100% FIXED RESPONSE VERSION

module.exports = {
  config: {
    name: "pitcher",
    version: "2.0",
    author: "Saju",
    role: 0,
    category: "game"
  },

  onStart: async function () {
    console.log("⚾ Pitcher Game Loaded");
  },

  handleEvent: async function (args) {
    return module.exports.onChat(args);
  },

  onChat: async function ({ api, event }) {
    try {

      const body = (event.body || "").trim().toLowerCase();

      if (!body) return;

      // OPEN GAME PANEL
      if (
        body === "pitcher" ||
        body === "game" ||
        body === "pitch"
      ) {

        return api.sendMessage(
`╔══════════════╗
   ⚾ PITCHER GAME ⚾
╚══════════════╝

Choose Your Ball 👇

1️⃣ Fast Ball
2️⃣ Curve Ball
3️⃣ Fire Ball

📌 Reply:
pitch 1
pitch 2
pitch 3
`,
          event.threadID
        );
      }

      // PLAY GAME
      if (body.startsWith("pitch ")) {

        const choose = body.split(" ")[1];

        if (
          choose !== "1" &&
          choose !== "2" &&
          choose !== "3"
        ) {

          return api.sendMessage(
            "❌ Use Only:\npitch 1\npitch 2\npitch 3",
            event.threadID
          );
        }

        const bot = Math.floor(Math.random() * 3) + 1;

        const balls = {
          "1": "⚡ Fast Ball",
          "2": "🌀 Curve Ball",
          "3": "🔥 Fire Ball"
        };

        let result = "";

        if (parseInt(choose) === bot) {
          result = "🎉 YOU WIN!";
        } else {
          result = "💀 YOU LOSE!";
        }

        return api.sendMessage(
`╔══════════════╗
   ⚾ MATCH RESULT ⚾
╚══════════════╝

👤 YOU:
${balls[choose]}

🤖 BOT:
${balls[String(bot)]}

🏆 RESULT:
${result}
`,
          event.threadID
        );
      }

    } catch (err) {
      console.log("PITCHER ERROR:", err);
    }
  }
};
