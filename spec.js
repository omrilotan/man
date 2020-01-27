const { resolve } = require('path');
const { promises: { readFile } } = require('fs');

const { info } = console;
const { exit } = process;

const FAKE_MAN = 'Hello, world!';
let man;

const stubs = {
	readFile: stub().resolves(Buffer.from(FAKE_MAN)),
	info: stub(),
	exit: stub(),
};

describe('man', () => {
	before(() => {
		require('fs').promises.readFile = stubs.readFile;
		console.info = stubs.info;
		process.exit = stubs.exit;

		man = require('.');
	});

	afterEach(() => {
		Object.values(stubs).forEach(
			stub => stub.resetHistory(),
		);
	});

	after(() => {
		console.info = info;
		process.exit = exit;
		require('fs').promises.readFile = readFile;
	});

	it('should log man file contents into console', async () => {
		await man();

		const [ text ] = console.info.firstCall.args;
		expect(text).to.equal(FAKE_MAN);
		expect(process.exit).to.not.have.been.called;
	});

	it('should only return the contents of man file', async () => {
		const text = await man({ print: false });

		expect(text).to.equal(FAKE_MAN);
		expect(console.info).to.not.have.been.called;
	});

	it('should exit process after man file contents into console', async () => {
		await man({ exit: true });

		expect(console.info).to.have.been.called;
		expect(process.exit).to.have.been.calledWith(0);
	});

	it('should read from a specified location', async () => {
		await man({ base: resolve('fixtures') });

		expect(stubs.readFile).to.have.been.calledWith(resolve('fixtures/docs/man.1'));
	});
});
