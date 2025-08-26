export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  globals: {
    __DEV__: true,
    "ts-jest": {
      tsconfig: "./tsconfig.app.json",
    },
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
