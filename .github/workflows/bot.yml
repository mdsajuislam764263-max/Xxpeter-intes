const fs = require("fs");
const { spawn } = require("child_process");

let bot;

function start() {
    console.log("🚀 Bot starting...");

    bot = spawn("node", ["index.js"], {
        stdio: "inherit",
        shell: true
    });

    bot.on("close", () => {
        console.log("♻ Bot stopped, restarting...");
        start();
    });
}

// watch account.txt
fs.watchFile("account.txt", () => {
    console.log("📄 account.txt changed!");
    if (bot) bot.kill();
    setTimeout(start, 2000);
});

start();
