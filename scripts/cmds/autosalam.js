const fs = require("fs-extra");

module.exports = {
  config: {
    name: "autosalam",
    version: "2.0",
    author: "Saju",
    role: 1
  },

  onStart: async function ({ api, event, args }) {
    const file = __dirname + "/cache/autosalam.json";

    let data = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file))
      : { status: false, mode: "hour", threadID: event.threadID };

    const input = args.join(" ").toLowerCase();

    // ================= ON =================
    if (input === "on") {
      data.status = true;
      data.threadID = event.threadID;
      fs.writeFileSync(file, JSON.stringify(data, null, 2));

      return api.sendMessage("✅ Auto Salam ON", event.threadID);
    }

    // ================= OFF =================
    if (input === "off") {
      data.status = false;
      fs.writeFileSync(file, JSON.stringify(data, null, 2));

      return api.sendMessage("❌ Auto Salam OFF", event.threadID);
    }

    // ================= MODE =================
    if (input === "minute") {
      data.mode = "minute";
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      return api.sendMessage("⏱ Mode 1 Minute set", event.threadID);
    }

    if (input === "hour") {
      data.mode = "hour";
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      return api.sendMessage("⏰ Mode 1 Hour set", event.threadID);
    }

    return api.sendMessage("autosalam on/off/minute/hour", event.threadID);
  },

  onLoad: async function ({ api }) {
    const file = __dirname + "/cache/autosalam.json";

    setInterval(() => {
      let data = fs.existsSync(file)
        ? JSON.parse(fs.readFileSync(file))
        : null;

      if (!data || !data.status) return;

      const time = data.mode === "minute" ? 60000 : 3600000;

      if (!data.last) data.last = 0;

      if (Date.now() - data.last >= time) {
        api.sendMessage(
          "Assalamu Alaikum 🤍✨",
          data.threadID
        );

        data.last = Date.now();
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
      }
    }, 15000);
  }
};
