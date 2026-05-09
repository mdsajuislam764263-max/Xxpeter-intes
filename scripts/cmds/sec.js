module.exports.config = {
  name: "sec",
  aliases: ["sec"],
  version: "1.1",
  author: "𝒔𝒂𝒋𝒖...𝒉𝒄..𝒎𝒐𝒅𝒆..𝒃𝒊𝒈.𝒃𝒐𝒔𝒔...",
  role: 1,
  category: "system"
};

// ===== GLOBAL STORAGE =====
global.secDB = global.secDB || {};
global.blacklist = global.blacklist || [];
global.securityMode = global.securityMode || false;

const ADMIN_UID = "61582071385233";

const SPAM_LIMIT = 6;
const TIME_WINDOW = 8000;
const MUTE_TIME = 60000;

// ================= TOGGLE COMMAND =================
module.exports.onStart = async function ({ api, event, args }) {
  const threadID = event.threadID;

  if (event.senderID !== ADMIN_UID) {
    return api.sendMessage("❌ You are not authorized.", threadID);
  }

  const action = args[0];

  if (action === "on") {
    global.securityMode = true;
    return api.sendMessage(
`╔══════════════════════╗
║  SECURITY SYSTEM 🛡️  ║
╠══════════════════════╣
║ STATUS : ENABLED     ║
╚══════════════════════╝`,
      threadID
    );
  }

  if (action === "off") {
    global.securityMode = false;
    return api.sendMessage(
`╔══════════════════════╗
║  SECURITY SYSTEM 💤  ║
╠══════════════════════╣
║ STATUS : DISABLED    ║
╚══════════════════════╝`,
      threadID
    );
  }

  return api.sendMessage(
`⚡ Usage:
/security on
/security off`,
    threadID
  );
};

// ================= MAIN SECURITY ENGINE =================
module.exports.handleEvent = async function ({ api, event }) {
  if (!global.securityMode) return; // 🔴 OFF MODE = ignore everything

  const uid = event.senderID;
  const threadID = event.threadID;

  if (uid === ADMIN_UID) return;

  if (global.blacklist.includes(uid)) return;

  if (!global.secDB[uid]) {
    global.secDB[uid] = {
      count: 1,
      last: Date.now(),
      mutedUntil: 0
    };
    return;
  }

  let user = global.secDB[uid];

  if (Date.now() < user.mutedUntil) return;

  if (Date.now() - user.last > TIME_WINDOW) {
    user.count = 1;
    user.last = Date.now();
    return;
  }

  user.count++;
  user.last = Date.now();

  if (user.count >= SPAM_LIMIT) {
    user.mutedUntil = Date.now() + MUTE_TIME;
    global.blacklist.push(uid);

    api.sendMessage(
`╔══════════════════════╗
║ SECURITY ALERT 🚨    ║
╠══════════════════════╣
║ USER BLOCKED         ║
╚══════════════════════╝`,
      threadID
    );

    try {
      if (api.removeUserFromGroup) {
        await api.removeUserFromGroup(uid, threadID);
      } else if (api.changeGroupParticipant) {
        await api.changeGroupParticipant(threadID, uid, false);
      }
    } catch (e) {}
  }
};
