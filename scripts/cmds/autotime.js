module.exports = {
	config: {
		name: "autotime",
		version: "3.0",
		author: "𝒔𝒂𝒋𝒖 𝒊𝒔𝒍𝒂𝒎",
		countDown: 5,
		role: 2,
		category: "SYSTEM"
	},

	onStart: async function ({ api, threadsData }) {

		const captions = [
			"☠ SYSTEM IS WATCHING YOU",
			"⚡ HACKER MODE ACTIVE",
			"🔥 ATTITUDE CORE ONLINE",
			"💀 DIGITAL DOMINATION RUNNING",
			"⚡ YOU ARE INSIDE THE SYSTEM",
			"☠ NO ESCAPE FROM TIME"
		];

		const banner = `
╔══════════════════════╗
   ⏰ AUTO TIME SYSTEM
   ☠ HACKER ATTITUDE CORE
╚══════════════════════╝
`;

		const threads = await threadsData.getAll();

		const groups = threads.filter(t =>
			t.isGroup &&
			t.members?.some(m =>
				m.userID == api.getCurrentUserID() && m.inGroup
			)
		);

		setInterval(async () => {

			const now = new Date();

			const time = now.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});

			const date = now.toLocaleDateString("en-GB");

			// random caption
			const caption = captions[Math.floor(Math.random() * captions.length)];

			const msg = `${banner}

📅 DATE :
${date}

⏰ TIME :
${time}

━━━━━━━━━━━━━━━━━━
💬 MESSAGE :
${caption}

👑 OWNER : 𝒔𝒂𝒋𝒖 𝒊𝒔𝒍𝒂𝒎
💀 STATUS : ACTIVE SYSTEM`;

			for (const g of groups) {
				try {
					await api.sendMessage(msg, g.threadID);
				} catch (e) {
					console.log("AUTO TIME ERROR:", e);
				}
			}

		}, 3600000); // 1 hour

		return api.sendMessage("⏰ AutoTime v3 ACTIVATED (Caption + Time + Date)", groups[0].threadID);
	}
};
