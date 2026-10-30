# Veyra Browser — Project Status

Last reviewed: 2026-10-29

## Project identity
- Repository: https://github.com/theDevstars/veyra-browser
- Default branch: `main`
- App name: Veyra Browser
- iOS bundle ID target: `com.thedevstars.veyra`
- Android application ID target: `com.thedevstars.veyra`

## Expo removal / standalone migration
The project is being converted from Expo-managed tooling to a standalone React Native CLI setup. Expo dependencies, Expo app configuration, Expo scripts, and Expo-based CI commands are being removed.

The root app currently imports only React Native primitives and `react-native-webview`, so the starter UI itself does not require Expo APIs. Native project scaffolding is a separate remaining step.

## Current repository implementation
- Root `App.js`: small React Native browser starter with address entry and WebView.
- `desktop/`: Electron shell for Windows.
- `sidestore-source.json`: Veyra SideStore source metadata; its app version list is empty.
- `assets/veyra-icon.svg`: Veyra icon source.

## Platform status
- Web: Vite + React Native Web build configuration is being introduced.
- Windows: Electron packages the web build.
- iOS: native React Native CLI Xcode project is not yet present.
- Android: native React Native CLI Gradle project is not yet present.
- SideStore: no installable IPA is published.

## Build workflow
Workflow: `.github/workflows/ios-build.yml`

The workflow is being narrowed to the platforms with committed build scaffolding (web and Windows). iOS and Android jobs must be restored after the native `ios/` and `android/` project folders are generated, committed, and validated.

## Imported source archive reviewed
The supplied `Laturenapp-main 2.zip` was inspected. It contains an older, much fuller mobile app and desktop source, but those older app sources have not yet been merged into this Veyra repository. The uploaded mobile source used Expo modules and needs a deliberate migration before it can replace the current starter.

## Next milestones
1. Finish standalone React Native CLI setup and verify the Vite web build.
2. Generate and commit native iOS and Android project folders.
3. Port the fuller mobile browser implementation without reintroducing Expo.
4. Verify Android APK and iOS archive/IPA builds.
5. Configure signing and publish a SideStore-compatible IPA release asset.
6. Expand the Windows desktop UI and test the installer.
7. Implement dock navigation, tabs, bookmarks/history, settings categories, privacy controls, and responsive polish.

## Platform notes
- The Electron wrapper packages the web build as a Windows installer; it is not a native Windows browser engine.
- iOS WebView restrictions limit browser-engine and extension capabilities.
- Cookie blocking and ad/tracker blocking are best-effort and vary by platform.
- A SideStore feed does not itself create, sign, or host an IPA.
