module.exports = {
	config: {
		name: "friendlist",
		version: "1.1",
		author: "..𝒔𝒂𝒋𝒖..𝒕𝒉𝒎",
		role: 1,
		category: "utility",
		description: "Show friend list and get UID by number"
	},

	onStart: async function ({ api, event, args, message }) {
		try {
			const friends = await api.getFriendsList();

			if (!friends || friends.length === 0)
				return message.reply("❌ No friends found.");

			// UID mode
			if (args[0] === "uid") {
				const number = parseInt(args[1]);

				const saved = cache.get(event.senderID);

				if (!saved)
					return message.reply("❌ আগে /friendlist চালাও");

				if (!number || number < 1 || number > saved.length)
					return message.reply("❌ Invalid number");

				const u = saved[number - 1];

				return message.reply(
					`👤 Name: ${u.name}\n🆔 UID: ${u.userID}`
				);
			}

			// normalize + fix name issue
			const list = friends.map(u => ({
				userID: u.userID || u.id,
				name:
					u.name ||
					u.fullName ||
					u.firstName ||
					u.title ||
					"Unknown"
			}));

			cache.set(event.senderID, list);

			let msg = `📋 FRIEND LIST\n👥 Total: ${list.length}\n\n`;

			list.forEach((u, i) => {
				msg += `${i + 1}. ${u.name}\n`;
			});

			msg += `\n➡️ UID দেখতে: /friendlist uid 1`;

			return message.reply(msg);

		} catch (e) {
			return message.reply("❌ Error: " + e.message);
		}
	}
};
