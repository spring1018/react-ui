#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const copyRecursiveSync = (src, dest, callback) => {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest);
	}

	const items = fs.readdirSync(src);
	let count = items.length;

	items.forEach((item) => {
		const srcPath = path.join(src, item);
		const destPath = path.join(dest, item);

		if (fs.lstatSync(srcPath).isDirectory()) {
			copyRecursiveSync(srcPath, destPath, () => {
				if (--count === 0) callback();
			});
		} else {
			if (fs.existsSync(destPath)) {
				rl.question(
					`"${destPath}" already exists. Do you want to overwrite it? (yes/no): `,
					(answer) => {
						if (answer.toLowerCase() === "yes") {
							fs.copyFileSync(srcPath, destPath);
							console.log(`"${srcPath}" copied to "${destPath}"`);
						} else {
							console.log(`Skipped copying "${srcPath}" to "${destPath}"`);
						}
						if (--count === 0) callback();
					},
				);
			} else {
				fs.copyFileSync(srcPath, destPath);
				console.log(`"${srcPath}" copied to "${destPath}"`);
				if (--count === 0) callback();
			}
		}
	});
};

const sourceDir = path.join(__dirname, "../components");
const destDir = path.join(process.cwd(), "components");

copyRecursiveSync(sourceDir, destDir, () => {
	console.log("All files copied.");
	rl.close();
});
