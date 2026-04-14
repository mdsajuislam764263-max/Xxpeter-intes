module.exports = {
  config: {
    name: "help",
    version: "3.0",
    author: "SOVA",
    countDown: 5,
    role: 0,
    shortDescription: "Hacker style menu",
    longDescription: "Advanced hacker UI help menu",
    category: "system",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    const commands = global.GoatBot.commands;

    let adminName = "➔𝄞⋆⚔⑅⃝sàjú⋆⃝⋆⃝👑_⋆⃝◥⃧⃜ؖؖؖؖ⃝";

    let categories = {};

    commands.forEach(cmd => {
      let cat = cmd.config.category || "unknown";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.config.name);
    });

    // 💻 Hacker Style Header
    let msg = `
┌──────────────────────────────┐
│   ⚠ SYSTEM ACCESS GRANTED ⚠  │
└──────────────────────────────┘

> USER: ${adminName}
> STATUS: ONLINE
> ACCESS: ROOT ADMIN
> SYSTEM TIME: ${new Date().toLocaleTimeString()}

[ INITIALIZING COMMAND DATABASE... ]
`;

    // 📂 Commands show
    for (let cat in categories) {
      msg += `\n╔═══[ ${cat.toUpperCase()} ]═══╗\n`;
      categories[cat].forEach(cmd => {
        msg += `➤ ${cmd}\n`;
      });
      msg += `╚════════════════════╝\n`;
    }

    msg += `
[ ✔ ] ALL MODULES LOADED
[ ✔ ] COMMANDS READY

> TOTAL CMDS: ${commands.size}
> POWERED BY: ${adminName}

┌──────────────────────────────┐
│  ⚡ HACK THE PLANET ⚡        │
└──────────────────────────────┘
`;

    // 😈 Hacker style anime girl (dark vibe)
    let img = "https://i.imgur.com/zYIlgBl.jpg";

    return api.sendMessage({
      body: msg,
      attachment: await global.utils.getStreamFromURL(img)
    }, event.threadID, event.messageID);
  }
};
