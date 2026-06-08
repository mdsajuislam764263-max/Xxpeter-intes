const puppeteer = require("puppeteer");
const fs = require("fs");

module.exports = {
  config: {
    name: "newsimg",
    version: "2.0",
    author: "saju",
    role: 0,
    category: "news",
    countDown: 10
  },

  onStart: async function ({ message }) {

    const url = "https://www.prothomalo.com";

    let browser;

    try {

      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      });

      const page = await browser.newPage();

      await page.setViewport({ width: 1280, height: 800 });

      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60000
      });

      const filePath = "/tmp/news.png";

      await page.screenshot({
        path: filePath,
        fullPage: true
      });

      await browser.close();

      return message.reply({
        body: "📰 আজকের Prothom Alo পত্রিকা",
        attachment: fs.createReadStream(filePath)
      });

    } catch (err) {
      if (browser) await browser.close();
      return message.reply("❌ পত্রিকা লোড করা যায়নি");
    }
  }
};
