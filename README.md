# Veyra Browser

Veyra is a cross-platform browser project built with **React Native and Expo**. Expo is the development and native build toolkit; the finished app is branded entirely as Veyra.

## Platforms

| Platform | Build path | Current state |
|---|---|---|
| iOS | Expo + EAS Build | EAS profiles configured; build not yet run |
| Android | Expo + EAS Build | EAS profiles configured; build not yet run |
| Web | Expo Metro web export | GitHub Actions export configured |
| Windows | Electron wrapping the Expo web export | Installer workflow configured |

The Windows package wraps the web build in Electron; it is not a separate native browser engine.

## Development

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

Run the web version:

```bash
npm run web
```

Run on a connected native development device or simulator:

```bash
npm run ios
npm run android
```

These native run commands require the relevant Xcode or Android Studio toolchain. **Expo Go is optional for previewing; it is not required for EAS production builds.**

## EAS Build

Install and sign in to EAS CLI:

```bash
npm install --global eas-cli
eas login
```

Build an iOS or Android preview:

```bash
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

Build production releases:

```bash
eas build --platform all --profile production
```

EAS credentials and Apple Developer requirements still apply. These profiles configure builds; they do not mean an IPA or APK has already been produced.

## GitHub Actions

[Veyra builds](https://github.com/theDevstars/veyra-browser/actions/workflows/build.yml) exports the Expo web app and packages the Windows Electron installer.

Automated EAS builds from GitHub Actions require an EXPO_TOKEN repository secret. The current workflow does not claim to produce iOS or Android binaries automatically.

## SideStore source

Add this source URL in SideStore:

`https://raw.githubusercontent.com/theDevstars/veyra-browser/main/sidestore-source.json`

The feed currently has no installable versions. A SideStore-compatible IPA must still be built, signed/packaged appropriately, and published as a release asset.

## Project status

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for implementation and next milestones.

## Important limitations

- Expo is tooling and does not add Expo branding to the finished Veyra app.
- iOS third-party browsers are subject to Apple's web-rendering and distribution requirements.
- Ad/tracker and cookie controls are best-effort and vary by platform.
- The current app is an early browser starter; successful packaging does not mean every browser feature is complete.
