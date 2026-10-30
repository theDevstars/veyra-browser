# Veyra Browser

Veyra is a cross-platform browser project targeting **iOS, Android, Windows desktop, and the web**.

## Platforms

| Platform | Current build path | Output |
|---|---|---|
| iOS | Expo prebuild + Xcode on macOS | Unsigned IPA artifact (requires signing for ordinary iPhone installation) |
| Android | Expo prebuild + Gradle | Release APK artifact |
| Windows | Expo web export packaged with Electron | Windows NSIS installer |
| Web | Expo web export | Static site in `dist/`, usable on desktop and mobile browsers |

The Windows package currently wraps the web export in Electron; it is not a separate native browser engine.

## Development

```bash
npm install --legacy-peer-deps
npx expo start
```

Use `npx expo start --ios`, `npx expo start --android`, or `npx expo start --web` as appropriate.

## Build workflow

GitHub Actions workflow: [Veyra multi-platform builds](https://github.com/theDevstars/veyra-browser/actions/workflows/ios-build.yml)

It validates/exports the web app, builds an Android APK, attempts an unsigned iOS IPA build, and packages a Windows installer. Run it manually from the Actions tab. Artifacts are attached to successful workflow runs.

## SideStore source

Add this source URL in SideStore:

`https://raw.githubusercontent.com/theDevstars/veyra-browser/main/sidestore-source.json`

The source feed is live, but it currently has **no installable versions**. A SideStore-compatible IPA must first be built, signed/packaged appropriately, and published as a release asset. An unsigned IPA is not directly installable on a normal iPhone.

## Project status

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for current implementation, build status, known limitations, and next milestones.

## Important limitations

- iOS third-party browsers use Apple's permitted web-rendering stack and cannot freely replace the system browser engine.
- Ad/tracker and cookie controls are best-effort and vary by platform.
- The browser source is still under active development; successful CI builds are not proof that every browser feature is production-ready.
