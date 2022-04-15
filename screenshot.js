#!/usr/bin/env node
const puppeteer = require('puppeteer');
const fs = require('fs');

const [, , ...args] = process.argv;

(async () => {
  const url = args[0];
  const filename = `${args[1]}.png`;
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: '/usr/bin/chromium-browser'
  });
  const page = await browser.newPage();
  try{
    await page.goto(url, {
      waitUntil: 'networkidle0'
    });
    await page.screenshot({
      path: filename,
      fullPage: true
    });

    await page.close();
    await browser.close();
  } catch(err){
    // console.log("screenshot caught exception")
    //console.error(err.message);
    process.exit(1);
  }
})();