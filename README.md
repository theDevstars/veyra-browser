# Veyra Browser

Veyra is a cross-platform browser project. The codebase is being moved to a **standalone React Native CLI** setup with no Expo runtime, tooling, configuration, or branding.

## Platforms

| Platform | Build path | Current state |
|---|---|---|
| Web | Vite + React Native Web | Build workflow configured |
| Windows | Electron wrapping the web build | Installer workflow configured |
| iOS | Native React Native CLI + Xcode | Native iOS project still needs to be generated and committed |
| Android | Native React Native CLI + Gradle | Native Android project still needs to be generated and committed |

The Windows package wraps the web build in Electron; it is not a separate native browser engine.

## Development

Install dependencies:

```bash
npm install
```

Run the web version:

```bash
npm run web
```

Build the web version:

```bash
npm run build:web
```

For native development, once the `ios/` and `android/` projects are added, use:

```bash
npm start
npm run ios
npm run android
```

## Build workflow

GitHub Actions: [Veyra builds](https://github.com/theDevstars/veyra-browser/actions/workflows/build.yml)

The workflow builds the web app and packages the Windows Electron installer. iOS and Android CI builds are intentionally not advertised until their native project folders and platform configuration are committed.

## SideStore source

Add this source URL in SideStore:

`https://raw.githubusercontent.com/theDevstars/veyra-browser/main/sidestore-source.json`

The feed currently has no installable versions. A compatible IPA must be built, signed/packaged appropriately, and published as a release asset before it can be installed through SideStore.

## Project status

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for current implementation, migration status, and next milestones.

## Important limitations

- iOS third-party browsers are subject to Apple's web-rendering and distribution requirements.
- Ad/tracker and cookie controls are best-effort and vary by platform.
- The current app is an early browser starter; successful web packaging does not mean every browser feature is complete.
