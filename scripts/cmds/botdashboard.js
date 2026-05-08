// botdashboard.js
// PRO BOT GROUP DASHBOARD (STABLE + WORKING)

const fs = require("fs");

const DB_FILE = "./groups_db.json";

// load database
function loadDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE));
  } catch {
    return [];
  }
}

// save database
function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

const ADMIN_IDS = ["61582071385233"];

function isAdmin(uid) {
  return ADMIN_IDS.includes(String(uid));
}

module.exports = {
  config: {
    name: "botdashboard",
    version: "2.0",
    author: "Saju",
    role: 0,
    category: "system"
  },

  onStart: async function () {
    console.log("🤖 BOT DASHBOARD READY");
  },

  onChat: async function ({ api, event }) {
    try {

      const body = (event.body || "").trim().toLowerCase();
      const db = loadDB();

      // AUTO STORE GROUP ID
      if (event.threadID && !db.includes(event.threadID)) {
        db.push(event.threadID);
        saveDB(db);
      }

      // PANEL
      if (body === "dashboard" || body === "bot dashboard") {

        if (!isAdmin(event.senderID)) {
          return api.sendMessage("❌ Admin only panel", event.threadID);
        }

        let list = db.map((id, i) => `${i + 1}. ${id}`).join("\n");

        return api.sendMessage(
`╔══════════════════════╗
      🤖 BOT DASHBOARD
╚══════════════════════╝

👥 TOTAL GROUPS: ${db.length}

📌 GROUP LIST:
${list || "No groups found"}

📡 STATUS: ONLINE ✅
💾 STORAGE: ACTIVE

💡 Commands:
stats
this group
clear groups`,
          event.threadID
        );
      }

      // STATS
      if (body === "stats") {

        return api.sendMessage(
`📊 BOT STATS

👥 Groups: ${db.length}
⚡ Status: Online
📡 Thread: ${event.threadID}`,
          event.threadID
        );
      }

      // THIS GROUP
      if (body === "this group") {

        return api.sendMessage(
`👥 CURRENT GROUP INFO

ID: ${event.threadID}
Bot: ACTIVE ✅`,
          event.threadID
        );
      }

      // CLEAR GROUPS
      if (body === "clear groups") {

        if (!isAdmin(event.senderID)) {
          return api.sendMessage("❌ Admin only", event.threadID);
        }

        saveDB([]);

        return api.sendMessage(
"🧹 All group data cleared!",
          event.threadID
        );
      }

    } catch (e) {
      console.log("DASHBOARD ERROR:", e);
    }
  }
};
