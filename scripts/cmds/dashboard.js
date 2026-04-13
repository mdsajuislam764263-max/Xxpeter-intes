module.exports = {
  config: {
    name: "panel",
    version: "1.0",
    role: 1,
    shortDescription: "Control dashboard"
  },

  onStart: async function ({ message }) {
    message.reply(`🎛️ CONTROL PANEL
━━━━━━━━━━━━━━

1️⃣ Protection Settings
2️⃣ Admin System
3️⃣ Group Control
4️⃣ Fun System
5️⃣ Bot Info

👉 Reply with number to select`);
  },

  onReply: async function ({ message, event, Reply }) {
    const choice = event.body;

    // 🔰 MAIN MENU
    if (!Reply) return;

    // 1️⃣ PROTECTION
    if (choice == "1") {
      return message.reply(`🛡️ PROTECTION PANEL

1. AntiLink ON/OFF
2. AntiSpam ON/OFF
3. AntiBot ON/OFF

Reply: 1on / 1off / 2on / 2off ...`);
    }

    // 2️⃣ ADMIN
    if (choice == "2") {
      return message.reply(`👑 ADMIN PANEL

- add [uid]
- remove [uid]
- list

Example:
admin add 123456`);
    }

    // 3️⃣ GROUP CONTROL
    if (choice == "3") {
      return message.reply(`👥 GROUP CONTROL

- kick @user
- mute @user
- unmute @user
- gcname [name]

Example:
kick @user`);
    }

    // 4️⃣ FUN
    if (choice == "4") {
      return message.reply(`🎭 FUN COMMANDS

- hack @user
- spam text
- dark text
- fakechat

Enjoy 😈`);
    }

    // 5️⃣ BOT INFO
    if (choice == "5") {
      return message.reply(`🤖 BOT INFO

Name: Hacker Bot
Version: 3.0
Status: Online ✅
Prefix: .

Owner: You 😎`);
    }

    // ⚙️ QUICK TOGGLE (ADVANCED)
    if (choice.endsWith("on") || choice.endsWith("off")) {
      return message.reply(`⚙️ Setting updated: ${choice}`);
    }
  }
};
