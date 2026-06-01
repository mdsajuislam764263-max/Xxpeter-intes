Install rp.js module.exports = {
	config: {
		name: "rp",
		version: "9.0",
		author: "𝒔𝒂𝒋𝒖....𝒊𝒏𝒕𝒆𝒓..",
		countDown: 0,
		role: 0,
		shortDescription: {
			en: "Hacker system active check"
		},
		category: "system",
		usePrefix: false
	},

	onStart: async function () {},

	onChat: async function ({ event, message }) {
		const body = event.body?.trim();

		// MUST MATCH EXACT 🤔
		if (body !== "B", "🤔" ) return;

		const sleep = ms => new Promise(r => setTimeout(r, ms));

		const videoUrl = "https://files.catbox.moe/8k2x9m.mp4";

		let msg = await message.reply("💀 SYSTEM DETECTED...");
		await sleep(800);

		msg = await message.reply("⌨️ scanning user...");
		await sleep(800);

		msg = await message.reply("📡 connecting server...");
		await sleep(900);

		msg = await message.reply("🔐 bypass security...");
		await sleep(900);

		// progress style
		const bars = [
			"█▒▒▒▒▒▒▒▒▒ 10%",
			"███▒▒▒▒▒▒▒ 30%",
			"█████▒▒▒▒▒ 50%",
			"███████▒▒▒ 70%",
			"█████████▒ 90%",
			"██████████ 100%"
		];

		for (let i = 0; i < bars.length; i++) {
			await message.unsend(msg.messageID);
			msg = await message.reply(`⚡ LOADING...\n${bars[i]}`);
			await sleep(700);
		}

		await message.unsend(msg.messageID);

		return message.reply({
			body:
`╭━━━〔 💀 HACKER MODE 〕━━━╮

🟢 STATUS: ONLINE
📡 SERVER: CONNECTED
🔐 SECURITY: OVERRIDDEN

💬 𝒚𝒆̣𝒔__𝒃𝒐𝒔𝒔..𝒊𝒎..𝒂𝒄𝒕𝒊𝒗𝒆..🗨️😏

🚀 CONTROL: FULL ACCESS
👁️ SYSTEM: STABLE

╰━━━〔 ✔ READY 〕━━━╯`,
			attachment: await global.utils.getStreamFromURL(videoUrl)
		});
	}
};
