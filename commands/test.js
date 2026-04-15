module.exports = {
  name: "test",

  run: async function({ api, event }) {

    api.sendMessage("😎 This will auto delete", event.threadID, (err, info) => {

      setTimeout(() => {
        api.unsendMessage(info.messageID);
      }, 5000);

    });

  }
};
