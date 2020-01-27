# man

## 📖 Print contents of package man file in console

### CLI
```bash
$ npx man
# or
$ manfile
# or
$ manual
```

### Package
```js
const man = require('man');

const [, , ...rest] = process.argv;

if (rest.includes('--help') || rest.includes('-h')) {
	await man({ exit: true });
}
```

> - Uses console.info to print
> - Module function returns the contents

Example: Using Yargs parser
```js
const parser = require('yargs-parser');
const man = require('man');

const args = parser(
	process.argv.slice(2),
	{
		alias: {
			help: [ 'h' ]
		}
	}
);

args.help
	? man()
	: runApp(args)
;
```

#### Arguments

##### exit
Whether to exit the process after finished. Defaults to `false`
```js
man({ exit: true })
```

##### print
Whether to print the contents of man file. Defaults to `true`
```js
man({ print: false })
```

##### base
Root from which to look for package.json and man files. Defaults to `process.cwd()`
```js
man({ base: '/home/app' })
```
