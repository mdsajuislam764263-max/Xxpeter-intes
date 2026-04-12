module.exports = {
  config: {
    name: "auto_reply_fun",
    version: "2.0.0",
    author: "SIYAM ULTRA EDIT",
    countDown: 5,
    role: 0,
    shortDescription: "মজার অটো রিপ্লাই 😏🔥",
    longDescription: "অনেক ইউনিক + ফানি + আনকমন কথার অটো রিপ্লাই",
    category: "noprefix",
  },

  onChat: async function ({ event, message }) {
    const { body } = event;
    if (!body) return;

    const text = body.toLowerCase().trim();

    const replyMap = {

      // 😈owner only
      "Bab": "Yés jan ki koro 😘",
      "refresh": "❤️❤️❤️❤️❤️❤️❤️❤️🧡💛💚💜💜🩵💚🧡💖💗💓🤎💙💙🧡🩵❤️💙💙🧡💛",
      "gud night": "ঘুম না দিলে ভূত আসবে 👻 সাবধান 😏",

      // 🌅 MORNING
      "good morning": "সকাল সকাল উঠে কি লাভ? 😒 আবার ঘুমাও 😴",
      "সুপ্রভাত": "সুপ্রভাত 🌸 কিন্তু উঠছো কই? 😆",
      "gud morning": "এইটা সকাল নাকি দুপুর? 😏",

      // 👋 BYE / LEAVE
      "bye": "যাও 😒 কিন্তু আবার ইনবক্সে ঢুকবা 😏",
      "goodbye": "এইভাবে গেলে কষ্ট লাগে 😭 কিন্তু যাও 😌",
      "see you": "দেখা হবে 😎 না হলে আমি খুঁজে নিব 😏",
      "later": "ঠিক আছে যাও, আমি বসে থাকলাম 😆",
      "gtg": "ঠিক আছে যাও 😴 কিন্তু ghost দিও না 😒",
      "i am going": "যাও 😏 কিন্তু miss করলে আবার আসবা 😎",
      "পরে কথা হবে": "ঠিক আছে, আমি লাস্ট সিন অন রাখলাম 😏",

      // 😔 SAD
      "i am sad": "কষ্ট থাকলে বলো 😌 আমি শুনে আবার হাসবো 😆",
      "amar mon kharap": "মন খারাপ? চলো বিরিয়ানি খাই 🍗 সব ঠিক 😏",
      "amar khub koshto hocche": "কষ্টে মানুষ বড় হয় 😌 তুমি তো already বড় 😆",

      // 🤲 ISLAMIC
      "assalamu alaikum": "ওয়ালাইকুম আসসালাম 🤍 কি খবর? 😌",
      "আসসালামু আলাইকুম": "ওয়ালাইকুম আসসালাম 😊 আল্লাহ ভরসা রাখো",

      // 😏 ATTITUDE / FUN
      "ki koro": "তোমার কথা ভাবতেছি 😌 বিশ্বাস করো না করলে 😏",
      "what are you doing": "তোমার মেসেজের অপেক্ষায় ছিলাম 😎",

      // 😂 FUNNY / TROLL
      "bal": "ভদ্র হও 😑 না হলে report খাইবা 😏",
      "pagol": "হ্যা 😌 কিন্তু স্টাইলিশ পাগল 😎",
      "boka": "বোকা আমি না 😏 তুমি একটু বেশি smart 🤣",
      "tor ki obostha": "ভালো 😎 কিন্তু তোমার জন্য খারাপ হয়ে যাই 😏",
      "khaiso": "না 😭 খাওয়াও 😏",
      "ki khobor": "তোমার খবরই তো নিচ্ছি 😎",
      "valo aso": "তুমি থাকলে ভালো থাকি 😏",

      // 💔 LOVE / FLIRT
      "i love you": "আমিও 😌 কিন্তু বিশ্বাস করবো নাকি? 😏",
      "love you": "এইসব কথা অনেককে বলো নাকি শুধু আমাকেই? 😎",
      "miss you": "মিস করলে সামনে আসো 😏",
      "bhalobashi": "এইটা dangerous word 😳 সাবধানে বলো 😏",

      // 😜 RANDOM
      "jaitechi": "যাও 😒 কিন্তু ফিরে আসবা 😏",
      "jaitesi": "ঠিক আছে যাও 😌 কিন্তু ভুলে যাইও না 😎",
      "ok": "শুধু ok? 😒 এত কষ্ট করে reply দিলাম 😏",
      "hmm": "hmm না 😒 কিছু বলো properly 😏",
      "h": "এইটা কি reply নাকি exam? 😆",

      // 🔥 EXTRA SAVAGE
      "tumi ke": "আমি সেই 😎 যাকে ignore করা যায় না 😏",
      "ke tumi": "আমি legend 😏 তুমি new player 😆",
      "bot naki": "না 😎 আমি AI boss 😏",
    };

    const reply = replyMap[text];
    if (!reply) return;

    return message.reply(reply);
  },

  onStart: async function () {},
};
