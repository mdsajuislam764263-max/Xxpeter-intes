module.exports.config = {
 name: "apl",
 version: "1.0",
 author: "𝒔𝒂𝒋𝒖...𝒉𝒄..𝒎𝒐𝒅𝒆..𝒃𝒊𝒈.𝒃𝒐𝒔𝒔...",
 role: 1,
 category: "admin",
 shortDescription: "Stealth auto delete system"
};

global.botMessages = global.botMessages || {};

module.exports.onLoad = function ({ api }) {
 const oldSend = api.sendMessage;

 api.sendMessage = function (msg, threadID, callback) {
 return oldSend(msg, threadID, (err, info) => {
 try {
 if (!global.botMessages[threadID]) global.botMessages[threadID] = [];

 if (info && info.messageID) {
 global.botMessages[threadID].push(info.messageID);

 // ⚡ AUTO DELETE AFTER 25 SEC
 setTimeout(() => {
 try {
 api.unsendMessage(info.messageID);
 } catch (e) {}
 }, 25000);
 }
 } catch (e) {}

 if (callback) callback(err, info);
 });
 };
};

module.exports.onStart = async function ({ api, event }) {
 const threadID = event.threadID;

 api.sendMessage(
`╔══════════════════════╗
║ APL SYSTEM ACTIVE ║
╠══════════════════════╣
║ MODE : STEALTH ║
║ STATUS : RUNNING ║
╚══════════════════════╝

⚡ Cleaning system ready...`,
 threadID
 );

 let deleted = 0;
 const list = global.botMessages?.[threadID] || [];

 for (const id of list) {
 try {
 await api.unsendMessage(id);
 deleted++;
 } catch (e) {}
 }

 global.botMessages[threadID] = [];

 api.sendMessage(
`╔══════════════════════╗
║ CLEAN COMPLETE 💀 ║
╠══════════════════════╣
║ TOTAL DELETED : ${deleted}
║ STATUS : DONE
╚══════════════════════╝

😈 ALL BOT MESSAGES REMOVED`,
 threadID
 );
};
