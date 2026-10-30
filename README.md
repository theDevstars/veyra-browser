# Veyra Browser

Veyra is a cross-platform browser project built with **React Native and Expo** for iOS and Android, plus a separate Electron desktop app for Windows. Expo is build tooling; the finished mobile app is branded Veyra.

## Platforms

| Platform | Build path | Current state |
|---|---|---|
| iOS | Expo + EAS Build | Preview IPA build configured; requires Expo and Apple signing credentials |
| Android | Expo + EAS Build | Preview APK build configured; requires an Expo build token |
| Windows | Standalone Electron desktop UI | Installer workflow configured; build result appears in GitHub Actions artifacts |

There is no hosted web-app target or Expo web export. The Windows app has its own desktop interface and does not depend on a web export.

## Mobile development

Install dependencies and start Expo:

```bash
npm install
npx expo start
```

Expo Go is optional for previewing. It is not required for EAS cloud builds.

## Build iOS IPA and Android APK

1. Add an `EXPO_TOKEN` secret in the GitHub repository's **Settings → Secrets and variables → Actions**.
2. Make sure the Expo project is configured and iOS signing credentials are available.
3. Open [GitHub Actions](https://github.com/theDevstars/veyra-browser/actions/workflows/build.yml).
4. Select **Run workflow**.

The workflow runs EAS with the `preview` profile for both iOS and Android. EAS build pages provide the resulting IPA and APK download links when builds finish successfully. If the Android preview output is generated as an AAB instead of an APK, change the Android preview build type to APK in the EAS profile before running.

You can also build from a machine with EAS CLI installed:

```bash
npx eas-cli build --platform ios --profile preview
npx eas-cli build --platform android --profile preview
```

## Build Windows EXE

The Windows installer builds automatically in GitHub Actions on pushes and pull requests to `main`. Open the workflow run and download the `Veyra-Windows-Installer` artifact.

## SideStore source

Add this source URL in SideStore:

`https://raw.githubusercontent.com/theDevstars/veyra-browser/main/sidestore-source.json`

The feed still needs a successful IPA build, SideStore-compatible signing/packaging, a published release asset, and a populated app version entry before it can install Veyra.

## Important limitations

- A successful package build does not mean every planned browser feature is complete.
- iOS third-party browsers are subject to Apple's web-rendering and distribution requirements.
- Cookie controls and ad/tracker blocking vary by platform.
- Windows currently uses Electron's embedded Chromium webview; it is a separate desktop app, not a native Windows browser engine.
