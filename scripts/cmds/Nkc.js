const fs = require("fs");

module.exports = {
  config: {
    name: "nkc",
    version: "6.0",
    author: "𝒔𝒂𝒋𝒖..𝒕𝒉𝒎",
    role: 1,
    category: "group",
    countDown: 5
  },

  // ================= DATABASE =================
  db: {
    male: [
      "লুচ্চা পান্ডা 🐼","হারবাল চিকিৎসক 🧖‍♂️","ঘুমকাতুরে রাজা 😴","মেমে বস 😎","ঝালমুড়ি কিং 🌶️",
      "ভাত গবেষক 🍚","আলু মন্ত্রী 🥔","রাত জাগা পেঁচা 🦉","ফ্রি ওয়াইফাই শিকারি 📶","গুগল মামা 🔍",
      "টেনশন মাস্টার 😵","নুডলস বস 🍜","বেকার সমিতি 🤓","সিঙ্গেল ক্যাপ্টেন 🫡","ফুটবল দার্শনিক ⚽",
      "বিরিয়ানি রক্ষক 🍗","মোবাইল ডাক্তার 📱","চা সম্রাট ☕","ঘুমের রাজা 🛌","স্ট্যাটাস কিং 👑",
      "রিল ব্যর্থ 😬","ডাটা শেষ 😭","চার্জার খোঁজে 🔌","চিপস জেনারেল 🍟","কফি আসক্ত ☕",
      "ঘুরাঘুরি মন্ত্রী 🚶","কথার মেশিন 🗣️","ফেক গুরু 🤡","লাইফ লোডিং ⏳","গেমিং নুব 🎮",
      "মাথা গরম 🌡️","ডিপ্রেশন ফাইটার 🥊","অফলাইন কিং 📴","টাইম ওয়েস্টার ⌛","ঘুমন্ত বাঘ 🐯",
      "রাগী কিন্তু কিউট 😤","সাইলেন্ট কিলার 🤫","মোবাইল আসক্ত 📱","ফুডি কিং 🍔","চা প্রেমিক ☕"
    ],

    female: [
      "রাগী রানী 👑","ক্রাশ কুইন 💖","ঘুমকাতুরে পরী 😴","চকলেট লাভার 🍫","ফুচকা বিশেষজ্ঞ 😋",
      "ড্রামা কুইন 🎭","সেলফি কুইন 🤳","বৃষ্টি প্রেমী 🌧️","বিড়াল আপু 🐱","গল্পের রানী 📖",
      "মিষ্টি ঝড় 🍭","চা আপু ☕","লিপস্টিক বস 💄","হাসির পরী 😂","টেডি লাভার 🧸",
      "কিউট বিপদ 😇","মুড সুইং বস 🌪️","রিল কুইন 🎬","ফুল পরী 🌸","কফি কন্যা ☕",
      "শপিং কুইন 🛍️","ফুডি আপু 🍔","ডায়েট কাল থেকে 🥗","মেকআপ কুইন 💅","রাগ দেখালে ভয় 😡",
      "ক্যামেরা লাভ 📸","স্টিকার কুইন 😜","ঘুম ভাঙা পরী 🧚","রাতের রানী 🌙","ফেসবুক কুইন 📘",
      "ড্রেসিং আপু 👗","আয়না প্রেমী 🪞","রিল বানাই 🎥","চা-নাস্তা আপু ☕","ফিল্টার কুইন ✨",
      "নেটওয়ার্ক লেডি 📶","চার্জার ছাড়া না 🔌","ঘুরাঘুরি আপু 🚶‍♀️","রাগী কিন্তু কিউট 😾",
      "ড্রামা ডিভা 🎭","সাইলেন্ট কুইন 🤫","মুডি গার্ল 🌈","কিউট ভূত 👻","স্টাইল কুইন 👗"
    ],

    old: {}
  },

  // ================= MAIN =================
  onStart: async function ({ api, event, message, args }) {

    const cmd = args[0];

    const threadInfo = await api.getThreadInfo(event.threadID);

    // ================= RESET =================
    if (cmd === "reset") {
      this.db.male = [];
      this.db.female = [];
      return message.reply("🔄 All nickname reset done");
    }

    // ================= RESTORE =================
    if (cmd === "restore") {
      let count = 0;

      for (const user of threadInfo.userInfo) {
        const old = this.db.old[user.id];
        if (old) {
          await api.changeNickname(old, event.threadID, user.id);
          count++;
        }
      }

      return message.reply(`🔄 ${count} restored`);
    }

    // ================= ADD =================
    if (cmd === "add") {
      const type = args[1];
      const name = args.slice(2).join(" ");

      if (!type || !name)
        return message.reply("Use: nkc add male/female name");

      if (type === "male") this.db.male.push(name);
      else if (type === "female") this.db.female.push(name);
      else return message.reply("Invalid type");

      return message.reply(`✅ Added: ${name}`);
    }

    // ================= CHANGE =================
    let count = 0;

    for (const user of threadInfo.userInfo) {

      if (!user.id) continue;
      if (user.id === api.getCurrentUserID()) continue;
      if (threadInfo.adminIDs.some(a => a.id === user.id)) continue;

      // save old
      this.db.old[user.id] = user.nickname || "";

      const list =
        user.gender === "FEMALE"
          ? this.db.female
          : this.db.male;

      const nick = list[Math.floor(Math.random() * list.length)];

      try {
        await api.changeNickname(nick, event.threadID, user.id);
        count++;
      } catch {}
    }

    return message.reply(`✅ ${count} nicknames changed`);
  }
};
