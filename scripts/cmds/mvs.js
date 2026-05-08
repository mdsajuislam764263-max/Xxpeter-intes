module.exports = {
	config: {
		name: "mvs",
		version: "3.0",
		author: "𝒔𝒂𝒋𝒖 𝒊𝒔𝒍𝒂𝒎",
		countDown: 3,
		role: 0,
		category: "media"
	},

	onStart: async function ({ message }) {
		const axios = require("axios");

		// safer CDN fallback (important)
		const videoUrl = "https://i.imgur.com/XLWxTfh.mp4";

		try {
			const res = await axios.get(videoUrl, {
				responseType: "stream",
				headers: {
					"User-Agent": "Mozilla/5.0"
				}
			});

			return message.reply({
				body:
`━━━━━━━━━━━━━━
👑 𝗔𝗗𝗠𝗜𝗡 / 𝗢𝗪𝗡𝗘𝗥 𝗩𝗜𝗗𝗘𝗢 👑
━━━━━━━━━━━━━━

🎥 Video Status: LOADED SUCCESSFULLY
⚡ System: SECURE MEDIA ENGINE
🛡️ Access: OWNER CONTENT

━━━━━━━━━━━━━━
✨ 𝒔𝒂𝒋𝒖 𝒊𝒔𝒍𝒂𝒎 BOT SYSTEM ✨
━━━━━━━━━━━━━━`,
				attachment: res.data
			});

		} catch (err) {
			console.log("VIDEO ERROR:", err.message);

			// fallback (IMPORTANT)
			return message.reply(
`❌ Video blocked by host/CDN

👉 Solution:
- Use Cloudinary / Telegram direct file link
- Or reupload video with direct CDN support`
			);
		}
	}
};
