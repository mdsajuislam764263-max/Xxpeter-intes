const roast = [
  "তুই WiFi ছাড়া useless 😂",
  "তোর brain loading... 1% 🤣",
  "Google-ও তোর answer পায় না 😆",
  "তুই offline থাকলেই best 😜",
  "Error 404: Brain not found 🤖"
];

module.exports = {
  config: { name: "roast", role: 0 },

  onStart: async ({ message }) => {
    const r = roast[Math.floor(Math.random()*roast.length)];
    message.reply("🔥 " + r);
  }
};
