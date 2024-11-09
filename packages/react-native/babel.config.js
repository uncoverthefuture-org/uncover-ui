module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@/*": "./src/*",
        "@assets": "./src/assets",
        "@components": "./src/components",
        "@utilities": "./src/utilities",
        "@providers": "./src/providers",
        "@themes": "./src/themes",
        "@hooks": "./src/hooks",
        // Add other aliases as needed
      }
    }]
  ],
};
