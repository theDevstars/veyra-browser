# Veyra Browser — Project Status

Last reviewed: 2026-10-29

## Project identity
- Repository: https://github.com/theDevstars/veyra-browser
- Default branch: main
- App name: Veyra Browser
- iOS bundle ID: com.thedevstars.veyra
- Android application ID: com.thedevstars.veyra

## Build system
Expo has been restored as Veyra's React Native development and build toolkit. The finished app remains branded Veyra; Expo Go is optional for previewing and is not required for EAS production builds.

- Expo SDK dependency and Expo entry point restored in package.json.
- Expo app configuration restored in app.json.
- Expo Babel and Metro configuration added.
- EAS Build profiles added in eas.json.
- Web export and Windows Electron packaging switched to Expo's Metro web export.

## Current implementation
- Root App.js: small React Native browser starter with address entry and WebView.
- desktop/: Electron shell for Windows.
- sidestore-source.json: Veyra SideStore source metadata; its app version list is empty.
- assets/veyra-icon.svg: Veyra icon source.

## Platform status
- Web: Expo web export is configured in GitHub Actions; build still needs to run and pass.
- Windows: Electron installer workflow is configured to package the Expo web export; build still needs to run and pass.
- iOS: EAS preview/production profiles are configured; no IPA has been built or published yet.
- Android: EAS preview/production profiles are configured; no APK/AAB has been built or published yet.
- SideStore: no installable IPA is published.

## CI
Workflow: .github/workflows/build.yml

The workflow exports the Expo web app and packages the Windows installer. Automated EAS builds from GitHub Actions require an EXPO_TOKEN repository secret; local EAS commands are documented in the README.

## Imported source archive reviewed
The supplied Laturenapp-main 2.zip was inspected. It contains an older, fuller mobile app and desktop source, but those older app sources have not yet been merged into this Veyra repository. The older mobile source used Expo modules and needs a deliberate merge before it can replace the current starter.

## Next milestones
1. Run and validate the Expo web export and Windows installer workflow.
2. Configure EAS credentials and build iOS and Android preview artifacts.
3. Merge the fuller browser UI and features from the supplied source archive.
4. Verify privacy controls, tabs, bookmarks, history, and customization on each platform.
5. Publish a SideStore-compatible IPA release asset and populate the source feed.
6. Expand and test the Windows desktop experience.

## Platform notes
- The Electron wrapper packages the web build as a Windows installer; it is not a native Windows browser engine.
- iOS WebView restrictions limit browser-engine and extension capabilities.
- Cookie blocking and ad/tracker blocking are best-effort and vary by platform.
- A SideStore feed does not itself create, sign, or host an IPA.
