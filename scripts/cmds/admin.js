const fs = require("fs");

module.exports = {
  config: {
    name: "admin",
    version: "2.0",
    role: 2,
    shortDescription: "Admin control system"
  },

  onStart: async function ({ message, args, event }) {
    const sub = args[0];

    if (!sub) {
      return message.reply("⚙️ Use: admin add/remove/list");
    }

    const configPath = "./config.json";
    const config = JSON.parse(fs.readFileSync(configPath));

    // ➕ ADD ADMIN
    if (sub === "add") {
      const uid = args[1];
      if (!uid) return message.reply("❌ UID needed");

      if (!config.admins.includes(uid)) {
        config.admins.push(uid);
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        return message.reply(`✅ Added admin: ${uid}`);
      } else {
        return message.reply("⚠️ Already admin");
      }
    }

    // ➖ REMOVE ADMIN
    if (sub === "remove") {
      const uid = args[1];
      config.admins = config.admins.filter(id => id !== uid);
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return message.reply(`❌ Removed admin: ${uid}`);
    }

    // 📜 LIST ADMINS
    if (sub === "list") {
      return message.reply("👑 Admins:\n" + config.admins.join("\n"));
    }
  }
};
