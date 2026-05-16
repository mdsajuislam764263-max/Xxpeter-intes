require("dotenv").config();

console.log("🚀 Bot starting...");

process.on("uncaughtException", (err) => {
  console.log("❌ Uncaught Error:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.log("❌ Promise Error:", err);
});

// Example bot loop (replace with your API bot)
function start() {
  try {
    console.log("✅ Bot is running...");

    setInterval(() => {
      console.log("💚 Alive:", new Date().toLocaleString());
    }, 10000);

  } catch (e) {
    console.log("Restarting bot...");
    setTimeout(start, 3000);
  }
}

start();
