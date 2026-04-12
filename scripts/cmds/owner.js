const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.3.0",
    author: "Mᴏʜᴀᴍᴍᴀᴅ Aᴋᴀsʜ",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`»̶̶͓͓͓̽̽̽⑅⃝𝔰𝔞𝔧𝔲⋆⃝🔻👿⑅⃝😸🪽❥»̶̶͓͓͓̽̽̽
╭────[ 👑 Øwñér 𝐈𝐍𝐅𝐎 👑]
├‣ 𝙽𝚊𝚖𝚎: »̶̶͓͓͓̽̽̽⑅⃝𝔰𝔞𝔧𝔲⋆⃝🔻👿⑅⃝😸🪽❥
├‣ 𝙶𝚎𝚗𝚍𝚎𝚛: MÀLÉ
├‣ 𝚄𝙸𝙳: 61582071385233
├‣ whatsapp: +8801857148644
├‣ 🫵🫵🫵😜😜😜😜😜
├‣ 𝙿𝚛𝚘𝚏𝚒𝚕𝚎 𝚄𝚁𝙻: https://www.facebook.com/profile.php?id=61582071385233
├‣ 𝙱𝚒𝚛𝚝𝚑𝚍𝚊𝚢: 𝙿𝚛𝚒𝚟𝚊𝚝𝚎
├‣ ⋆⃝🔻👿⑅⃝😸🪽❥🤫👻
╰‣ ⑅⃝𝔰𝔞𝔧𝔲⋆⃝🔻👿⑅⃝😸🪽❥

╭─────[ 𝐔𝐒𝐄𝐑 𝐒𝐓𝐀𝐓𝐒 ]
├‣ 𝙼𝚘𝚗𝚎𝚢: 100000k$
├‣ 𝚁𝚊𝚗𝚔: #890/892
├‣ 𝙼𝚘𝚗𝚎𝚢 𝚁𝚊𝚗𝚔: #890/892
╰‣ 𝙱𝚊𝚋𝚢 𝚝𝚎𝚊𝚌𝚑: 👻`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.imgur.com/1G4ZhU7.jpeg";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send);
  }
};
