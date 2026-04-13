module.exports = {
  config: { name: "slot", role: 0 },

  onStart: async ({ message }) => {
    const items = ["🍎","🍌","🍇"];
    let r1 = items[Math.floor(Math.random()*3)];
    let r2 = items[Math.floor(Math.random()*3)];
    let r3 = items[Math.floor(Math.random()*3)];

    if (r1 === r2 && r2 === r3) {
      message.reply(`${r1}|${r2}|${r3}\n🎉 JACKPOT!`);
    } else {
      message.reply(`${r1}|${r2}|${r3}\nTry again`);
    }
  }
};
