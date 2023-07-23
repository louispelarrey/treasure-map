module.exports = {
  // All other Jest configurations...
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  testEnvironment: "jsdom",
};
