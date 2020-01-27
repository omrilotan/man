const { join } = require('path');
const { promises: { readFile } } = require('fs');

/**
 * Read and print package man file
 * @param  {string}  [options.base=process.cwd()] Root from which to look for package.json and man files
 * @param  {boolean} [options.exit=false]         Whether to exit the process after finished
 * @param  {boolean} [options.print=true]         Whether to print the contents of man file
 * @return {string}                contents of man file
 */
module.exports = async function manual({
	base = process.cwd(),
	exit = false,
	print = true,
} = {}) {
	const { man } = require(join(base, 'package.json'));
	const file = join(base, man);
	const content = await readFile(file);
	const text = content.toString();
	print && console.info(text);
	exit && process.exit(0);
	return text;
};
