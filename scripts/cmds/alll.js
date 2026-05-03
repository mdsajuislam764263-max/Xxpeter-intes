module.exports = {
	config: {
		name: "alll",
		version: "2.1",
		author: "NTKhang + ChatGPT",
		countDown: 5,
		role: 1,
		description: {
			en: "Tag alll members with short funny text"
		},
		category: "box chat"
	},

	onStart: async function ({ message, event, args }) {
		try {
			const { participantIDs } = event;

			// 😆 Short funny texts
			const funnyTexts = [
				"বের হ 😡",
				"কই গেলি 😒",
				"এই এই 😑",
				"চুপ কেন 😤",
				"রিপ্লাই দে 😏",
				"ঘুমাস নাকি 😴",
				"অনলাইন আয় 😐",
				"লুকাস না 😏",
				"দেখা দে 😎",
				"সবাই আয় 🔥",
				"কি অবস্থা 🤨",
				"চ্যাট কর 😤",
				"এই শোন 😑",
				"কই তুই 😐",
				"জীবিত আছস? 😏",
				"উঠ সবাই 😡",
				"দেখাই দে 😎",
				"চুপ না 😤",
				"হাজির দে 😏"
			];

			// যদি user কিছু লিখে দেয় → সেটাই use হবে
			const text = args.join(" ") || funnyTexts[Math.floor(Math.random() * funnyTexts.length)];

			let body = text;
			const mentions = [];

			let i = 0;
			for (const uid of participantIDs) {
				const tag = `@${i + 1}`;
				body += " " + tag;

				mentions.push({
					tag,
					id: uid
				});

				i++;
			}

			return message.reply({ body, mentions });

		} catch (err) {
			console.error(err);
			return message.reply("Error 😢");
		}
	}
};
