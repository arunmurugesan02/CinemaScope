/* eslint-disable import/no-extraneous-dependencies */
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);



