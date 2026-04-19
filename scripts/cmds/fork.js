exports.config = {
  name: "rules",
  version: "5.0",
  author: "MOHAMMAD AKASH",
  countDown: 0,
  role: 0,
  shortDescription: "send images",
  longDescription: "Responds rules image send fast. Cooldown: 10 seconds.",
  category: "system",
  guide: {
    en: "Type 'Rules' or 'rules'"
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
  const rules = m.includes("Rules") || m.includes("rules");
  if(fork){
    y.sendattachment("📗:\nhttps://i.supaimg.com/5a6fa6f6-f640-4904-a88d-3866f9dac96e/d4dc94a7-4a67-4e9f-9637-91762b2359d4.jpg", t, z.messageID);
    last[t] = n;
  }
};
