# Veyra Browser

Veyra is a cross-platform browser built with Expo, React Native WebView, and Electron.

## Platforms

- **iOS:** unsigned IPA built by GitHub Actions. Installing on an iPhone requires signing and provisioning; SideStore can be used with an appropriately prepared IPA.
- **Android:** release APK built by GitHub Actions.
- **Windows:** Electron EXE installer built by GitHub Actions.

## Build from source

Requirements: Node.js 20+, and platform build tools (Xcode/CocoaPods for iOS, Java 17/Android SDK for Android, Windows for the EXE installer).

```bash
npm install --legacy-peer-deps
```

Mobile native projects are generated with:

```bash
npx expo prebuild --platform ios
npx expo prebuild --platform android
```

The Windows desktop app can be built with:

```bash
cd desktop
npm install
npm run dist
```

## GitHub Actions

Push changes to the app, configuration, assets, or desktop files to trigger the **Build Veyra IPA, APK and EXE** workflow. You can also run it manually from the repository's Actions tab. A successful run publishes all three artifacts in a GitHub Release.

**Note:** The iOS workflow creates an unsigned IPA. It is not an App Store-signed app and may require SideStore signing/provisioning before installation.
