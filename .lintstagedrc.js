module.exports = {
	'./src/**/*.ts': (filenames) => `npx eslint ${filenames.join(' ')}`,
	'./src/**/*.ts': () => 'tsc --pretty --noEmit',
};
