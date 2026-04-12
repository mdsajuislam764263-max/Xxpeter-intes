exports.config = {
  name: "foku",
  version: "5.0",
  author: "MOHAMMAD AKASH",
  countDown: 0,
  role: 0,
  shortDescription: "message send",
  longDescription: "Responds with my   'message send' is mentioned. Cooldown: 10 seconds.",
  category: "system",
  guide: {
    en: "Type 'foku' or '🫵'"
  }
};

const last = {};
const cool = 10000;

exports.onStart = async function(){};

exports.onChat = async function({event: z, api: y}){
  const t = z.threadID;
  const n = Date.now();
  if(last[t] && n - last[t] < cool) return;
  const m = (z.body || "").toLowerCase().trim();
  if(!m) return;
  const fork = m.includes("foku") || m.includes("🫵");
  if(fork){
    y.sendMessage("😜😜😜:\n⑅⃝𝔰𝔞𝔧𝔲 On behalf of 🫵🫵😹😱🤩🤪😜😝😛😋😱😮‍💨🤯🫨🤮🤢🤢🤮🤡👻💩☠️🙊🙀💦😹👀🫰🤞🫵🤏🤌⋆⃝🔻👿⑅⃝😜", t, z.messageID);
    last[t] = n;
  }
};
