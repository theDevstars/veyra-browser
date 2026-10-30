# Veyra Browser — Project Status

Last reviewed: 2026-10-29

## Project identity
- Repository: https://github.com/theDevstars/veyra-browser
- Default branch: main
- App name: Veyra Browser
- iOS bundle ID: com.thedevstars.veyra
- Android application ID: com.thedevstars.veyra

## Build system
- Expo SDK 54 is used for iOS and Android native builds.
- Expo web platform configuration and web export dependencies/scripts have been removed.
- EAS Build profiles are configured in eas.json.
- Windows has a separate Electron desktop UI and no longer consumes an Expo web export.
- GitHub Actions validates Expo config and packages Windows on pushes/PRs; a manually dispatched run builds iOS and Android through EAS when EXPO_TOKEN is configured.

## Current implementation
- Root App.js: early React Native browser starter with address entry and WebView.
- desktop/index.html: standalone Windows desktop browser interface.
- desktop/main.js: Electron app entry point.
- sidestore-source.json: Veyra SideStore source metadata; its app version list is empty.
- assets/veyra-icon.svg: Veyra icon source.

## Platform status
- iOS: EAS preview IPA workflow is configured; no successful IPA build has yet been verified.
- Android: EAS preview APK workflow is configured; no successful APK build has yet been verified.
- Windows: standalone Electron installer workflow is configured; no successful EXE build has yet been verified.
- Web: intentionally not a target; no web export or hosted web app is configured.
- SideStore: no installable IPA is published yet.

## Required build setup
- Add the Expo access token as the GitHub Actions secret EXPO_TOKEN.
- Ensure iOS Apple signing credentials are configured in the Expo project.
- Run the workflow manually for iOS and Android. Windows builds run on pushes/PRs to main.

## Next milestones
1. Run the GitHub Actions workflow and verify the Windows installer.
2. Configure Expo credentials and run the iOS IPA and Android APK builds.
3. Merge the fuller browser UI and features from the previously supplied source archive.
4. Verify tabs, bookmarks, history, privacy controls, and customization on each platform.
5. Publish a SideStore-compatible IPA release asset and populate the source feed.

## Platform notes
- Windows uses Electron's embedded Chromium webview, not a native Windows browser engine.
- iOS WebView restrictions limit browser-engine and extension capabilities.
- Cookie blocking and ad/tracker blocking are best-effort and vary by platform.
- A SideStore feed does not itself create, sign, or host an IPA.
