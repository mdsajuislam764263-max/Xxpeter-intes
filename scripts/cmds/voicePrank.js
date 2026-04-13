const pranks = [
  "📞 Hello... apnar account hack hoye geche 😈",
  "🚨 Police bolchi! apni dhora porchen 😂",
  "💀 System warning! Virus detected!",
  "👻 Ami tomar pichone achi... 😱",
  "🎧 Secret agent speaking... mission failed 😎"
];

// optional voice links (mp3)
const voices = [
  "https://files.catbox.moe/8y8k1h.mp3",
  "https://files.catbox.moe/abc123.mp3"
];

module.exports = {
  config: {
    name: "vprank",
    version: "1.0",
    role: 0,
    shortDescription: "Voice prank fun"
  },

  onStart: async function ({ message }) {
    const prank = pranks[Math.floor(Math.random()*pranks.length)];
    const voice = voices[Math.floor(Math.random()*voices.length)];

    message.reply(prank);

    // send voice
    try {
      message.reply({
        body: "🎤 Voice Message",
        attachment: await global.utils.getStreamFromURL(voice)
      });
    } catch (e) {
      message.reply("❌ Voice failed, but prank sent 😆");
    }
  }
};
