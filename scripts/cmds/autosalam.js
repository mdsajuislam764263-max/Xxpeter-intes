const fs = require("fs-extra");

module.exports = {
  config: {
    name: "autosalam",
    version: "3.0",
    author: "Saju"
  },

  onStart: async function ({ api, event, args }) {
    const file = __dirname + "/cache/salam.json";

    let data = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file))
      : { status: false, threadID: null };

    const input = args.join(" ").toLowerCase();

    // ================= ON =================
    if (input === "on") {
      data.status = true;
      data.threadID = event.threadID;

      fs.writeFileSync(file, JSON.stringify(data, null, 2));

      return api.sendMessage(
        "✅ Auto Salam ON",
        event.threadID
      );
    }

    // ================= OFF =================
    if (input === "off") {
      data.status = false;
      fs.writeFileSync(file, JSON.stringify(data, null, 2));

      return api.sendMessage(
        "❌ Auto Salam OFF",
        event.threadID
      );
    }

    return api.sendMessage("Use: on / off", event.threadID);
  },

  onLoad: async function ({ api }) {
    const file = __dirname + "/cache/salam.json";

    setInterval(() => {
      try {
        if (!fs.existsSync(file)) return;

        const data = JSON.parse(fs.readFileSync(file));

        if (!data.status || !data.threadID) return;

        api.sendMessage(
          "Assalamu Alaikum 🤍✨",
          data.threadID
        );

      } catch (e) {
        console.log("AutoSalam Error:", e.message);
      }
    }, 60000); // 1 minute test
  }
};
