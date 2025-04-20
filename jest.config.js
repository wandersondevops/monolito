module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "@shared/(.*)": "<rootDir>/src/modules/@shared/$1",
  },
  testTimeout: 10000,
  // Force Jest to exit after all tests complete
  forceExit: true,
  // Set a timeout for test teardown
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
};
