module.exports = {
  config: { name: "tod", role: 0 },

  onStart: async ({ message }) => {
    const q = Math.random() > 0.5 
      ? "Truth: Your secret?"
      : "Dare: Send emoji 😈";
    message.reply(q);
  }
};
