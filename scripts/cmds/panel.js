module.exports = {
  config: {
    name: "panel",
    version: "1.0",
    role: 0,
    shortDescription: "Hacker panel UI"
  },

  onStart: async function ({ message }) {
    message.reply(`💻 HACKER PANEL\n━━━━━━━━━━━━━━\n
[✓] System Access\n[✓] Database\n[✓] Users Control\n[✓] Server Online\n
Type .root to gain full access 😈`);
  }
};
