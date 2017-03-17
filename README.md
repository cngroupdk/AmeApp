# AmeApp
The goal of the workshop's is the app A'me (appreciate me) which is gamification tool for Slack.

## Requirements
- [brew](http://brew.sh/) (on macOS)
- [watchman](https://facebook.github.io/watchman/)
- [`nvm`](https://github.com/creationix/nvm)
- [yarn](https://yarnpkg.com/en/)
- ReactNative CLI
- [Node.js](https://nodejs.org/)
  - see `./.nvmrc` for what version is required
  - `nvm install THE_VERSION`
  - `nvm alias default THE_VERSION` (make it default system version)
- Xcode 8.0 or later
- [Android Studio](http://developer.android.com/sdk/index.html) 1.5.1 or later

```sh
brew install watchman nvm
nvm install
nvm use
npm install --global yarn gulp-cli react-native-cli
```

## Install

```sh
yarn
```

## Run iOS
Run `react-native run-ios` or open `ios/AmeApp.xcodeproj/` in Xcode and press Run.

## Run Android
Run `react-native run-android`or open `./android` in Android Studio and press Run. (Dont forget do download SDK platform and set up emulator)

## Scripts
`yarn start` to run packager
