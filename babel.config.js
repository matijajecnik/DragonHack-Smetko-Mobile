module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: [
          'react-native-paper/babel',
          [
            "expo-location",
            {
              "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
            }
          ]
        ],
      },
    },
  };
};