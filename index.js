require("dotenv").config();
/**
 * Goat Bot Render Deployment Fix by Eren
 */

const express = require("express");
const { spawn } = require("child_process");
const log = require("./logger/log.js");
// === BIG TEXT LOG (PURE GREEN) ===
console.log(`
\x1b[32m
 █████╗ ██████╗ ██████╗ ██╗  ██╗███████╗██╗     ██╗ ██████╗ ███╗   ██╗
██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔════╝██║     ██║██╔═══██╗████╗  ██║
███████║██████╔╝██████╔╝███████║█████╗  ██║     ██║██║   ██║██╔██╗ ██║
██╔══██║██╔═══╝ ██╔═══╝ ██╔══██║██╔══╝  ██║     ██║██║   ██║██║╚██╗██║
██║  ██║██║     ██║     ██║  ██║███████╗███████╗██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝

                        ██╗  ██╗
                        ╚██╗██╔╝
                         ╚███╔╝
                         ██╔██╗
                        ██╔╝ ██╗
                        ╚═╝  ╚═╝

             ███████╗██████╗ ███████╗███╗   ██╗
             ██╔════╝██╔══██╗██╔════╝████╗  ██║
             █████╗  ██████╔╝█████╗  ██╔██╗ ██║
             ██╔══╝  ██╔══██╗██╔══╝  ██║╚██╗██║
             ███████╗██║  ██║███████╗██║ ╚████║
             ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝
\x1b[0m
`);


// === Express server to keep Render service alive ===
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("EREN BOT RUNNING \n author: Eren \n Status: smooth 🥵");
});

app.listen(PORT, () => {
	console.log(`✅ Server running at http://localhost:${PORT}`);
});

// === Start the Goat bot process ===
function startProject() {
	const child = spawn("node", ["Goat.js"], {
		cwd: __dirname,
		stdio: "inherit",
		shell: true
	});

	child.on("close", (code) => {
		if (code === 2) {
			log.info("Restarting Project...");
			startProject();
		}
	});
}

startProject();
