# Veyra Browser

A customizable browser project for **iOS, Android, and the web**. The web build can also be used from Windows PCs in a modern browser.

## Platforms
- iOS: Expo / React Native (requires macOS/Xcode or EAS for native builds).
- Android: Expo / React Native (APK/AAB).
- Web: Expo Web, usable on Windows, macOS, Linux, and mobile browsers.
- Windows desktop: use the web build for now; a native Windows installer is not included yet.

## Development
```bash
npm install
npx expo start
```
Use `npx expo start --android`, `npx expo start --ios`, or `npx expo start --web`.

## SideStore
Add this source in SideStore:

`https://raw.githubusercontent.com/theDevstars/veyra-browser/main/sidestore-source.json`

The feed's IPA URL is a release target. It will only work after a compatible IPA has been built, signed/packaged, and uploaded as the `Veyra.ipa` release asset. GitHub Actions artifacts are not automatically SideStore releases.

## Status
This repository contains the cross-platform starter and CI workflow. Browser features and native builds should be expanded and tested before publishing a production release.
