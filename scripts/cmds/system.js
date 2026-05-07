module.exports = {
  config: {
    name: "system",
    version: "2.0.0",
    author: "Sova",
    role: 2,
    category: "system"
  },

  // =========================
  // ▶ MAIN COMMANDS
  // =========================
  onStart: async function ({ api, event }) {
    const { threadID, senderID, body } = event;

    if (!global.sysHack) global.sysHack = {};

    const cmd = (body || "").trim().toLowerCase();

    // =========================
    // 🔴 RESTART CONFIRM (HACK STYLE)
    // =========================
    if (cmd === "restart") {
      global.sysHack[threadID] = {
        type: "restart",
        sender: senderID
      };

      return api.sendMessage(
        "╔════════════════════╗\n" +
        "   💀 SYSTEM OVERRIDE 💀\n" +
        "╚════════════════════╝\n\n" +
        "⚠️ RESTART PROTOCOL INITIATED...\n\n" +
        "[YES] ➜ CONFIRM EXECUTION\n" +
        "[NO]  ➜ ABORT MISSION",
        threadID
      );
    }

    // =========================
    // ⏳ LOADING (HACKER ANIMATION)
    // =========================
    if (cmd === "loading") {
      const frames = [
        "▰▱▱▱▱ SYSTEM BOOTING...",
        "▰▰▱▱▱ LOADING CORE FILES...",
        "▰▰▰▱▱ BYPASSING SECURITY...",
        "▰▰▰▰▱ CONNECTING NODE...",
        "▰▰▰▰▰ ACCESS GRANTED ✔",
        "💀 HACK MODE ACTIVE..."
      ];

      return api.sendMessage("▰▱▱▱▱ SYSTEM BOOTING...", threadID, (err, info) => {
        let i = 0;

        const interval = setInterval(() => {
          i++;

          if (i >= frames.length) {
            clearInterval(interval);
            return;
          }

          api.editMessage(frames[i], info.messageID, threadID);
        }, 900);
      });
    }

    // =========================
    // 📊 PROGRESS BAR (HACK STYLE)
    // =========================
    if (cmd === "progress") {
      const steps = [0,10,20,30,40,50,60,70,80,90,100];

      const bar = (p) => {
        const total = 10;
        const fill = Math.round((p / 100) * total);
        const empty = total - fill;

        return "█".repeat(fill) + "░".repeat(empty);
      };

      return api.sendMessage(
        "💀 INITIALIZING SYSTEM...\n",
        threadID,
        (err, info) => {
          let i = 0;

          const interval = setInterval(() => {
            const percent = steps[i];

            const msg =
              "╔════════════════════╗\n" +
              "   ⚡ HACK PROGRESS ⚡\n" +
              "╚════════════════════╝\n\n" +
              `[${bar(percent)}] ${percent}%\n` +
              `STATUS: ${percent < 100 ? "RUNNING..." : "COMPLETE ✔"}`;

            api.editMessage(msg, info.messageID, threadID);

            i++;

            if (i >= steps.length) {
              clearInterval(interval);
            }
          }, 700);
        }
      );
    }
  },

  // =========================
  // ▶ YES / NO HANDLER
  // =========================
  onChat: async function ({ api, event }) {
    const { threadID, senderID, body } = event;

    if (!body || !global.sysHack || !global.sysHack[threadID]) return;

    const session = global.sysHack[threadID];
    const msg = body.trim().toLowerCase();

    if (session.sender !== senderID) return;

    // ▶ YES (RESTART)
    if (session.type === "restart" && msg === "yes") {
      delete global.sysHack[threadID];

      await api.sendMessage(
        "💀 EXECUTING RESTART SEQUENCE...\nSYSTEM SHUTDOWN IN 3...",
        threadID
      );

      setTimeout(() => {
        process.exit(1);
      }, 2500);
    }

    // ▶ NO (ABORT)
    if (session.type === "restart" && msg === "no") {
      delete global.sysHack[threadID];

      return api.sendMessage(
        "🛑 MISSION ABORTED!\nSYSTEM STABLE ✔",
        threadID
      );
    }
  }
};
