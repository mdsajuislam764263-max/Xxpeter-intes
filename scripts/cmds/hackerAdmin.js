module.exports = {
  config: {
    name: "hack",
    version: "1.0",
    role: 1, // admin only
    shortDescription: "Hacker admin system"
  },

  onStart: async function ({ message, args, event, api }) {
    const cmd = args[0];

    // hacker style header
    const hackerUI = (text) => `
💻 SYSTEM ACCESS GRANTED
━━━━━━━━━━━━━━━━━━
⚡ ${text}
━━━━━━━━━━━━━━━━━━
🟢 STATUS: ONLINE
`;

    // COMMANDS

    if (cmd === "ping") {
      return message.reply(hackerUI("Server Response: 0.01ms 🚀"));
    }

    if (cmd === "info") {
      return message.reply(hackerUI(
        `User ID: ${event.senderID}\nThread ID: ${event.threadID}`
      ));
    }

    if (cmd === "clear") {
      return message.reply(hackerUI("🧹 Chat Cleaned (visual prank)"));
    }

    if (cmd === "scan") {
      return message.reply(hackerUI("🔍 Scanning system...\nNo threats found"));
    }

    if (cmd === "lock") {
      return message.reply(hackerUI("🔒 System Locked"));
    }

    // default menu
    message.reply(`
💻 HACKER PANEL
━━━━━━━━━━━━━━
⚡ .hack ping
⚡ .hack info
⚡ .hack scan
⚡ .hack clear
⚡ .hack lock
━━━━━━━━━━━━━━
🔐 Admin Access Only
`);
  }
};
