module.exports = {
	config: {
		name: "rp",
		version: "10.2",
		author: "𝒔𝒂𝒋𝒖....𝒊𝒏𝒕𝒆𝒓..",
		countDown: 0,
		role: 0,
		shortDescription: {
			en: "Hacker system active check (🤔 + BT alias)"
		},
		category: "system",
		handleEvent: true
	},

	onStart: async function () {},

	handleEvent: async function ({ event, message }) {
		const body = event.body?.trim();

		if (!body) return;

		// ✅ BT ALIAS FIX (case insensitive)
		const isBT =
			body.toLowerCase() === "bt";

		const isEmoji = body === "🤔";

		if (!isBT && !isEmoji) return;

		const sleep = ms => new Promise(r => setTimeout(r, ms));

		const videoUrl = "https://files.catbox.moe/8k2x9m.mp4";

		let msg = await message.reply("💀 SYSTEM DETECTED...");
		await sleep(700);

		msg = await message.reply("⌨️ scanning user...");
		await sleep(700);

		msg = await message.reply("📡 connecting server...");
		await sleep(800);

		msg = await message.reply("🔐 bypassing firewall...");
		await sleep(800);

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
			msg = await message.reply(`⚡ LOADING SYSTEM...\n${bars[i]}`);
			await sleep(600);
		}

		await message.unsend(msg.messageID);

		return message.reply({
			body:
`╭━━━〔 💀 HACKER MODE ACTIVE 〕━━━╮

🟢 STATUS: ONLINE
📡 SERVER: CONNECTED
🔐 SECURITY: OVERRIDDEN
🚀 ACCESS: FULL CONTROL

💬 𝒚𝒆̣𝒔__𝒃𝒐𝒔𝒔..𝒊𝒎..𝒂𝒄𝒕𝒊𝒗𝒆..🗨️😏

👁️ SYSTEM: STABLE
⚡ MODE: DARK ACTIVE

╰━━━〔 ✔ SUCCESS 〕━━━╯`,
			attachment: await global.utils.getStreamFromURL(videoUrl)
		});
	}
};
