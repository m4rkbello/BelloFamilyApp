const { getDefaultConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
    input: './global.css', // Ensure this points to your CSS file
    configPath: './tailwind.config.js',
});