/**
 * Goat Bot GitHub Deploy Ready (by 𝒔𝒂𝒋𝒖 𝒊𝒔𝒍𝒂𝒎)
 */

const express = require("express");
const { spawn } = require("child_process");
const log = require("./logger/log.js");

console.log(`
\x1b[32m
█████╗ ██████╗ ██████╗  GITHUB DEPLOY READY BOT
𝒔𝒂𝒋𝒖 𝒊𝒔𝒍𝒂𝒎 SYSTEM ACTIVE
\x1b[0m
`);

// ================== SAFE ERROR HANDLER ==================
process.on("uncaughtException", err => {
	console.log("CRASH FIX:", err.message);
});

process.on("unhandledRejection", err => {
	console.log("PROMISE FIX:", err.message);
});

// ================== EXPRESS SERVER ==================
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Goat Bot is Running ✅ | GitHub Deploy Ready");
});

app.listen(PORT, () => {
	console.log(`SERVER LIVE ON PORT ${PORT}`);
});

// ================== AUTO START BOT ==================
function startBot() {
	const child = spawn("node", ["Goat.js"], {
		cwd: __dirname,
		stdio: "inherit",
		shell: true
	});

	child.on("close", (code) => {
		console.log("BOT STOPPED:", code);
		setTimeout(startBot, 3000); // auto restart safe
	});

	child.on("error", (err) => {
		console.log("SPAWN ERROR:", err.message);
		setTimeout(startBot, 5000);
	});
}

startBot();
