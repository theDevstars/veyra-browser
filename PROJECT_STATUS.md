# Veyra Browser — Project Status

Last reviewed: 2026-10-29

## Project identity
- Repository: https://github.com/theDevstars/veyra-browser
- Default branch: `main`
- App name: Veyra Browser
- Expo slug: `veyra-browser`
- iOS bundle ID: `com.thedevstars.veyra`
- Android application ID: `com.thedevstars.veyra`

## Current implementation
- Expo / React Native starter in `App.js`.
- Basic address/search input and embedded `react-native-webview`.
- Expo targets configured for iOS, Android, and web.
- Web export is intended to run in desktop and mobile browsers, including Windows PCs.
- A native Windows desktop installer is not configured yet.
- Browser UI is currently a starter, not the complete feature set.

## Build pipeline
Workflow: `.github/workflows/ios-build.yml`

Intended jobs:
- Web export
- Android export validation
- iOS export and optional Xcode archive

Latest observed run: https://github.com/theDevstars/veyra-browser/actions/runs/40982513994

Status at last review: failed on all three jobs during `actions/setup-node`; dependency installation and platform exports were skipped. The workflow enables npm caching, but the repository listing did not show a package lockfile. Add and commit a lockfile (recommended: `package-lock.json`) or remove npm caching from setup-node before rerunning.

## SideStore
Feed file: `sidestore-source.json`

Source URL:
`https://raw.githubusercontent.com/theDevstars/veyra-browser/main/sidestore-source.json`

The feed currently points to the GitHub release asset:
`https://github.com/theDevstars/veyra-browser/releases/latest/download/Veyra.ipa`

That install link will only work after a SideStore-compatible IPA is built and uploaded to a GitHub release with the exact asset name `Veyra.ipa`. The feed currently references an icon at `assets/icon.png`; verify that file exists before publishing the source.

## Next milestones
1. Add the full browser source/project files and assets.
2. Commit `package-lock.json` and repair the Node setup/cache failure.
3. Get web and Android validation green.
4. Configure a reproducible iOS IPA build and publish the expected release asset.
5. Verify the SideStore feed, icon URL, and install flow.
6. Add a native Windows desktop package if a standalone installer is required.
7. Track features, bugs, and build results here after each meaningful change.

## Product feature backlog
- Dock-based search/navigation UI and tab controls.
- Bookmarks/saved pages and history.
- Separate customization, privacy/security, and extensions settings.
- Tracking/ad-blocking controls with clearly documented platform limitations.
- Responsive desktop/mobile layouts and platform-specific polish.

## Important platform notes
- Expo web can provide browser access on Windows, macOS, Linux, and mobile browsers; it is not the same as a native Windows executable.
- iOS WebView restrictions limit the browser-engine and extension capabilities available to third-party iOS browsers.
- A SideStore feed is only a catalog; it does not itself create, sign, or host a working IPA.
