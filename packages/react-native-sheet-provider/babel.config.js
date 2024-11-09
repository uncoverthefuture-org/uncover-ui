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
        "@components": "./src/components",
        "@providers": "./src/providers",
        // Add other aliases as needed
      }
    }]
  ],
};
