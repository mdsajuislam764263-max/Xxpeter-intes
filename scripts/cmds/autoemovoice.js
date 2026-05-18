Install autoemovoice.js module.exports = {
  config: {
    name: "autoemovoice",
    version: "2.0",
    author: "𝒔𝒂𝒋𝒖...𝒔𝒕𝒚𝒍𝒆𝒔",
    role: 0,
    category: "ai-auto"
  },

  onLoad: function () {
    if (global.autoEmojiVoice === undefined) {
      global.autoEmojiVoice = false;
    }
  },

  onStart: async function ({ api, event, args }) {
    const cmd = args[0];

    if (cmd === "on") {
      global.autoEmojiVoice = true;
      return api.sendMessage("✅ AI Emoji Voice ON 🎧", event.threadID, event.messageID);
    }

    if (cmd === "off") {
      global.autoEmojiVoice = false;
      return api.sendMessage("❌ AI Emoji Voice OFF", event.threadID, event.messageID);
    }

    return api.sendMessage(
      "🎧 ব্যবহার:\n• autoemovoice on\n• autoemovoice off",
      event.threadID,
      event.messageID
    );
  },

  handleEvent: async function ({ api, event }) {
    if (!global.autoEmojiVoice) return;

    const text = event.body;
    if (!text) return;

    const map = [
      {
        emoji: "😂",
        msg: "😂 হাসির মুড অন!",
        audio: "https://files.catbox.moe/laugh.mp3"
      },
      {
        emoji: "❤️",
        msg: "❤️ লাভ ভাইব অন!",
        audio: "https://files.catbox.moe/love.mp3"
      },
      {
        emoji: "💔",
        msg: "💔 স্যাড মুড!",
        audio: "https://files.catbox.moe/sad.mp3"
      },
      {
        emoji: "😡",
        msg: "😡 রাগ মুড!",
        audio: "https://files.catbox.moe/angry.mp3"
      },
      {
        emoji: "😎",
        msg: "😎 স্টাইল মুড!",
        audio: "https://files.catbox.moe/cool.mp3"
      }
    ];

    const found = map.find(m => text.includes(m.emoji));
    if (!found) return;

    try {
      const stream = await global.utils.getStreamFromURL(found.audio);

      return api.sendMessage(
        {
          body: `${found.emoji} ${found.msg} 🎧`,
          attachment: stream
        },
        event.threadID,
        event.messageID
      );

    } catch (e) {
      return api.sendMessage(
        `${found.emoji} ${found.msg}`,
        event.threadID,
        event.messageID
      );
    }
  }
};
