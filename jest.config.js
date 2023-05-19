module.exports = {
	// ...
	setupFiles: ["jest-fetch-mock"],
	setupFilesAfterEnv: ["./setupJest.js"],
	testEnvironment: "jsdom"
};