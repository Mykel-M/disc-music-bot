const chalk = require('chalk').default;

function isValidYouTubeUrl(url) {
	const startTime = Date.now();
	console.log(chalk.cyan(`[module]: [youtubeValidator.js] Checking if URL is valid: ${url}`));
	const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\n\s]*)$/;
	const isValid = youtubeRegex.test(url);
	const endTime = Date.now();
	const validationTime = (endTime - startTime) / 1000;

	if (isValid) {
		console.log(chalk.cyan(`[module]: [youtubeValidator.js] URL is valid: ${url}`));
	}
	else {
		console.log(chalk.magenta(`[module]: [youtubeValidator.js ERROR] Invalid URL: ${url}`));
	}

	console.log(chalk.cyan(`[module]: [youtubeValidator.js] URL validation took: ${validationTime} seconds`));
	return isValid;
}

function extractVideoId(url) {
	const startTime = Date.now();
	console.log(chalk.cyan(`[module]: [youtubeValidator.js] Extracting video ID from URL: ${url}`));
	const match = url.match(/(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\n\s]*)/);

	const endTime = Date.now();
	const extractionTime = (endTime - startTime) / 1000;

	if (match) {
		console.log(chalk.cyan(`[module]: [youtubeValidator.js] Extracted video ID: ${match[1]}`));
	}
	else {
		console.log(chalk.magenta(`[module]: [youtubeValidator.js ERROR] No video ID found in URL: ${url}`));
	}

	console.log(chalk.cyan(`[module]: [youtubeValidator.js] Video ID extraction took: ${extractionTime} seconds`));
	return match ? match[1] : null;
}

module.exports = {
	isValidYouTubeUrl,
	extractVideoId,
};
