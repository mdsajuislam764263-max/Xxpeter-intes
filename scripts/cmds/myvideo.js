module.exports = {
	config: {
		name: "myvideo",
		aliases: ["video", "mv"],
		version: "1.1",
		author: "𝒔𝒂𝒋𝒖 𝒊𝒔𝒍𝒂𝒎",
		countDown: 5,
		role: 0,
		shortDescription: "Send personal video from link",
		category: "media"
	},

	onStart: async function ({ message }) {
		const axios = require("axios");

		// তোমার ভিডিও URL
		const videoUrl = "https://i.imgur.com/XLWxTfh.mp4";

		try {
			const response = await axios({
				url: videoUrl,
				method: "GET",
				responseType: "stream"
			});

			return message.reply({
				body: "🎥 Here is my video",
				attachment: response.data
			});

		} catch (err) {
			return message.reply("❌ Video load failed!");
		}
	}
};
