const chalk = require('chalk').default;
const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(stealthPlugin());

let browser = null;
let currentPage = null;

// Define the blue-green color using Chalk
const blueGreen = chalk.hex('#00CED1');

async function launchBrowser() {
	const startTime = Date.now();
	try {
		if (!browser) {
			console.log(blueGreen('[hndlr]: [puppeteerHandler.js] Launching Puppeteer...'));
			browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
			console.log(blueGreen('[hndlr]: [puppeteerHandler.js] Puppeteer launched successfully.'));
		}

		// Check if currentPage is already set, if not, initialize it
		if (!currentPage) {
			const pages = await browser.pages();
			currentPage = pages[0] || await browser.newPage();
			console.log(blueGreen('[hndlr]: [puppeteerHandler.js] New page initialized.'));
		}

		// Log the number of open tabs in the browser
		const openTabs = await browser.pages();
		console.log(blueGreen(`[hndlr]: [puppeteerHandler.js] Number of open tabs: ${openTabs.length}`));
		if (openTabs.length > 1) {
			console.log(chalk.yellow('[hndlr]: [puppeteerHandler.js WARNING] More than 1 tab is open!'));
		}

		const endTime = Date.now();
		const launchTime = (endTime - startTime) / 1000;
		console.log(blueGreen(`[hndlr]: [puppeteerHandler.js] Browser launch took: ${launchTime} seconds`));

	}
	catch (error) {
		console.error(chalk.magenta('[hndlr]: [puppeteerHandler.js ERROR] Error launching Puppeteer:', error));
		throw error;
	}
}

async function openUrl(url) {
	try {
		if (!currentPage) {
			console.error(chalk.magenta('[hndlr]: [puppeteerHandler.js ERROR] No page available to open the URL.'));
			throw new Error('No page available.');
		}

		// Check if the current tab is already displaying the desired URL
		const currentUrl = await currentPage.url();
		if (currentUrl !== url) {
			console.log(blueGreen(`[hndlr]: [puppeteerHandler.js] Navigating to URL: ${url}`));

			// Start timing the URL loading process
			console.time(blueGreen('[hndlr]: [puppeteerHandler.js] Load time:'));
			const response = await currentPage.goto(url);
			console.log(blueGreen(`[hndlr]: [puppeteerHandler.js] URL response status: ${response.status()}`));

			// Wait for the page to fully load
			await currentPage.waitForSelector('video', { timeout: 10000 });
			console.log(blueGreen('[hndlr]: [puppeteerHandler.js] Video element found.'));

			// End the timing and log the time it took to load the URL
			console.timeEnd(blueGreen('[hndlr]: [puppeteerHandler.js] Load time:'));
		}
		else {
			console.log(blueGreen(`[hndlr]: [puppeteerHandler.js] Already on the desired URL: ${url}`));
		}
	}
	catch (error) {
		console.error(chalk.magenta('[hndlr]: [puppeteerHandler.js] Error opening URL:', error));
		throw error;
	}
}

module.exports = {
	launchBrowser,
	openUrl,
};