# Veyra Browser — Project Status

Last reviewed: 2026-10-29

## Project identity
- Repository: https://github.com/theDevstars/veyra-browser
- Default branch: `main`
- App name: Veyra Browser
- Expo slug: `veyra-browser`
- iOS bundle ID: `com.thedevstars.veyra`
- Android application ID: `com.thedevstars.veyra`

## Imported source archive reviewed
The supplied `Laturenapp-main 2.zip` was inspected. It contains:
- A fuller React Native mobile browser implementation in `App.js` (about 92 KB).
- Expo configuration and dependencies, including AsyncStorage, Image Picker, Safe Area Context, and WebView.
- A desktop Electron implementation and Windows installer configuration.
- Two older Saturn/Lantern iOS/mobile build workflows.
- Saturn-branded app/feed metadata and icon assets.

**Important:** the full 92 KB mobile `App.js` and the large desktop HTML source have not yet been copied into this repository. The current root `App.js` remains the small starter app. The repository dependency/configuration files were aligned with the imported app's dependencies, and a Veyra icon source plus a new Electron wrapper were added. Do not treat the imported feature set as already present in the repo until those source files are merged.

## Current repository implementation
- Expo / React Native starter in root `App.js`.
- Basic address/search input and embedded `react-native-webview`.
- Expo targets configured for iOS, Android, and web.
- Veyra SVG icon source at `assets/veyra-icon.svg`; CI generates `assets/icon.png`.
- Electron entry point and packaging config in `desktop/`; Windows build packages the web export.
- SideStore feed at `sidestore-source.json`.

## Build pipeline
Workflow: `.github/workflows/ios-build.yml`

Jobs are configured for:
- Web export
- Android APK
- Unsigned iOS IPA
- Windows Electron installer

The prior workflow failed during `actions/setup-node` because npm caching was enabled without a committed lockfile. The updated workflow removes npm caching and uses `npm install --legacy-peer-deps`. A new run was triggered by the latest commits; its result is pending/in progress at last review:
https://github.com/theDevstars/veyra-browser/actions

The iOS IPA is unsigned and is not directly installable on a standard iPhone without an appropriate signing/provisioning process.

## SideStore
Source URL:
`https://raw.githubusercontent.com/theDevstars/veyra-browser/main/sidestore-source.json`

The feed is configured with the Veyra bundle ID and icon metadata, but currently has an empty `versions` list. It is a source/catalog URL, not an install link for an IPA. Add an installable version only after a compatible IPA is successfully published.

## Next milestones
1. Merge the full mobile `App.js` and desktop HTML/source from the supplied ZIP.
2. Verify the app builds against Expo 54 dependencies.
3. Get web and Android CI green.
4. Confirm the iOS Xcode scheme and generate a valid IPA artifact.
5. Configure signing or SideStore-compatible installation and publish an IPA release asset.
6. Verify the SideStore feed and icon in SideStore.
7. Test the Windows installer and polish platform-specific UI.

## Product backlog
- Dock-based search/navigation UI and tab controls.
- Bookmarks/saved pages and history.
- Separate customization, privacy/security, and extensions settings.
- Tracking/ad-blocking controls with clearly documented platform limitations.
- Responsive desktop/mobile layouts and platform-specific polish.

## Platform notes
- Expo web is a web app usable on Windows, macOS, Linux, and mobile browsers; it is not a native Windows executable.
- The Electron wrapper packages the web export as a Windows installer.
- iOS WebView restrictions limit browser-engine and extension capabilities.
- Cookie blocking and ad/tracker blocking are best-effort and vary by platform.
- A SideStore feed does not itself create, sign, or host an IPA.
