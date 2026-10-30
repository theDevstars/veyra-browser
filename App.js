import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, Pressable, View, ScrollView, Switch, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import Svg, { Path, Circle, Rect } from "react-native-svg";

const PURPLE = "#8170f5";
const DEFAULTS = { compactDock: false, blockCookies: false, httpsOnly: false, javascript: true };

function Glyph({ name, color = "#d8d4ef", size = 22 }) {
  const common = { stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  const paths = {
    back: <Path {...common} d="M19 12H5m7 7-7-7 7-7" />,
    forward: <Path {...common} d="M5 12h14m-7-7 7 7-7 7" />,
    reload: <Path {...common} d="M20 7v5h-5M4.8 16A8 8 0 0 0 19 12M4 17v-5h5M19.2 8A8 8 0 0 0 5 12" />,
    home: <><Path {...common} d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></>,
    bookmark: <Path {...common} d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-4-6 4z" />,
    settings: <><Path {...common} d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z" /><Path {...common} d="m19.4 13.5 1.1.9-1.1 1.9-1.4-.5a7.8 7.8 0 0 1-1.5.9l-.2 1.5h-2.2l-.4-1.4a7.8 7.8 0 0 1-1.8 0l-.8 1.2-1.9-1.1.5-1.4a7.8 7.8 0 0 1-.9-1.5l-1.5-.2v-2.2l1.4-.4a7.8 7.8 0 0 1 0-1.8l-1.2-.8 1.1-1.9 1.4.5a7.8 7.8 0 0 1 1.5-.9l.2-1.5h2.2l.4 1.4a7.8 7.8 0 0 1 1.8 0l.8-1.2 1.9 1.1-.5 1.4a7.8 7.8 0 0 1 .9 1.5l1.5.2v2.2l-1.4.4a7.8 7.8 0 0 1 0 1.8Z" /></>,
    shield: <Path {...common} d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />,
    plus: <Path {...common} d="M12 5v14M5 12h14" />,
    close: <Path {...common} d="m18 6-12 12M6 6l12 12" />,
    search: <><Circle {...common} cx="10.8" cy="10.8" r="6.8" /><Path {...common} d="m16 16 5 5" /></>
  };
  return <Svg width={size} height={size} viewBox="0 0 24 24">{paths[name] || paths.search}</Svg>;
}

export default function App() {
  const web = useRef(null);
  const [address, setAddress] = useState("");
  const [url, setUrl] = useState("");
  const [opened, setOpened] = useState(false);
  const [canBack, setCanBack] = useState(false);
  const [canForward, setCanForward] = useState(false);
  const [panel, setPanel] = useState("home");
  const [settingsSection, setSettingsSection] = useState("main");
  const [saved, setSaved] = useState([]);
  const [prefs, setPrefs] = useState(DEFAULTS);

  useEffect(() => {
    (async () => {
      try {
        const [s, p] = await Promise.all([AsyncStorage.getItem("veyra:saved"), AsyncStorage.getItem("veyra:prefs")]);
        if (s) setSaved(JSON.parse(s));
        if (p) setPrefs({ ...DEFAULTS, ...JSON.parse(p) });
      } catch (_) {}
    })();
  }, []);

  const navigate = (raw = address) => {
    const value = raw.trim();
    if (!value) return;
    const hasProtocol = value.startsWith("https://") || value.startsWith("http://");
    const target = hasProtocol ? (prefs.httpsOnly && value.startsWith("http://") ? "https://" + value.slice(7) : value) : value.includes(".") && !value.includes(" ") ? "https://" + value : "https://www.google.com/search?q=" + encodeURIComponent(value);
    Keyboard.dismiss();
    setAddress(target);
    setUrl(target);
    setOpened(true);
    setPanel("home");
  };

  const togglePref = async (key, value) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    try { await AsyncStorage.setItem("veyra:prefs", JSON.stringify(next)); } catch (_) {}
  };

  const saveCurrent = async () => {
    if (!url) return;
    const next = saved.some(x => x.url === url) ? saved : [{ url, title: url.replace(/^https?:\/\//, "").split("/")[0] }, ...saved];
    setSaved(next);
    try { await AsyncStorage.setItem("veyra:saved", JSON.stringify(next)); } catch (_) {}
    setPanel("saved");
  };

  const openSaved = item => { setAddress(item.url); setUrl(item.url); setOpened(true); setPanel("home"); };
  const goHome = () => { setOpened(false); setUrl(""); setAddress(""); setPanel("home"); };
  const row = (icon, title, subtitle, onPress) => <Pressable key={title} style={s.menuRow} onPress={onPress}><View style={s.menuIcon}><Glyph name={icon} color={PURPLE} size={20} /></View><View style={{ flex: 1 }}><Text style={s.menuTitle}>{title}</Text>{!!subtitle && <Text style={s.menuSub}>{subtitle}</Text>}</View><Text style={s.chevron}>›</Text></Pressable>;
  const setting = (title, subtitle, key) => <View key={key} style={s.settingRow}><View style={{ flex: 1, paddingRight: 12 }}><Text style={s.menuTitle}>{title}</Text><Text style={s.menuSub}>{subtitle}</Text></View><Switch value={!!prefs[key]} onValueChange={v => togglePref(key, v)} trackColor={{ false: "#39364c", true: "#6556c9" }} thumbColor={prefs[key] ? "#fff" : "#b5b0c9"} /></View>;

  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="#10101a" />
      {opened && panel === "home" ? (
        <WebView ref={web} source={{ uri: url }} style={s.web} onNavigationStateChange={st => { setAddress(st.url); setUrl(st.url); setCanBack(st.canGoBack); setCanForward(st.canGoForward); }} javaScriptEnabled={prefs.javascript} thirdPartyCookiesEnabled={!prefs.blockCookies} sharedCookiesEnabled={!prefs.blockCookies} allowsBackForwardNavigationGestures />
      ) : (
        <View style={s.content}>
          <View style={s.topBrand}><View><Text style={s.brand}>veyra</Text><Text style={s.brandCaption}>BROWSER</Text></View><Pressable style={s.topAction} onPress={() => { setPanel("settings"); setSettingsSection("main"); }}><Glyph name="settings" size={21} /></Pressable></View>
          {panel === "home" && <ScrollView contentContainerStyle={s.home}>
            <View style={s.heroMark}><Text style={s.heroV}>V</Text></View>
            <Text style={s.welcome}>Browse your way.</Text>
            <Text style={s.subtitle}>A calmer space for everything online.</Text>
            <View style={s.quickActions}>
              <Pressable style={s.quickCard} onPress={() => setPanel("saved")}><Glyph name="bookmark" color={PURPLE} size={22} /><Text style={s.quickTitle}>Saved pages</Text><Text style={s.quickSub}>{saved.length} saved</Text></Pressable>
              <Pressable style={s.quickCard} onPress={() => { setPanel("settings"); setSettingsSection("main"); }}><Glyph name="settings" color={PURPLE} size={22} /><Text style={s.quickTitle}>Customize</Text><Text style={s.quickSub}>Make it yours</Text></Pressable>
            </View>
          </ScrollView>}
          {panel === "saved" && <ScrollView contentContainerStyle={s.panelBody}><View style={s.panelHeading}><Pressable onPress={() => setPanel("home")}><Text style={s.backText}>‹ Home</Text></Pressable><Text style={s.panelTitle}>Saved pages</Text></View>{saved.length === 0 ? <Text style={s.empty}>Pages you save will appear here.</Text> : saved.map((item, i) => <Pressable key={item.url + i} style={s.savedRow} onPress={() => openSaved(item)}><Glyph name="bookmark" color={PURPLE} /><View style={{ flex: 1, marginLeft: 12 }}><Text style={s.menuTitle}>{item.title}</Text><Text style={s.menuSub} numberOfLines={1}>{item.url}</Text></View><Pressable onPress={async () => { const next = saved.filter(x => x.url !== item.url); setSaved(next); await AsyncStorage.setItem("veyra:saved", JSON.stringify(next)); }}><Glyph name="close" size={18} /></Pressable></Pressable>)}</ScrollView>}
          {panel === "settings" && <ScrollView contentContainerStyle={s.panelBody}>
            <View style={s.panelHeading}><Pressable onPress={() => settingsSection === "main" ? setPanel("home") : setSettingsSection("main")}><Text style={s.backText}>‹ {settingsSection === "main" ? "Home" : "Settings"}</Text></Pressable><Text style={s.panelTitle}>{settingsSection === "main" ? "Settings" : settingsSection[0].toUpperCase() + settingsSection.slice(1)}</Text></View>
            {settingsSection === "main" ? <>{row("settings", "Customization", "Theme and browser appearance", () => setSettingsSection("customization"))}{row("shield", "Security & privacy", "Cookies, tracking and site controls", () => setSettingsSection("security"))}{row("plus", "Extensions", "Extension support and management", () => setSettingsSection("extensions"))}</> : null}
            {settingsSection === "customization" && <>{setting("Compact dock", "Use a smaller bottom toolbar", "compactDock")}</>}
            {settingsSection === "security" && <>{setting("Limit third-party cookies", "Restricts third-party cookies where the platform WebView supports it", "blockCookies")}<View style={s.infoCard}><Text style={s.menuTitle}>Tracking protection</Text><Text style={s.menuSub}>Advanced network-level tracker blocking is not active yet. It will be added in a later security update.</Text></View>{setting("HTTPS preference", "Prefer secure HTTPS addresses", "httpsOnly")}{setting("JavaScript", "Allow websites to run JavaScript", "javascript")}</>}
            {settingsSection === "extensions" && <View style={s.infoCard}><Text style={s.menuTitle}>Extensions are coming</Text><Text style={s.menuSub}>The extension manager will be added after the core browser controls are restored.</Text></View>}
          </ScrollView>}
        </View>
      )}
      <View style={[s.dock, prefs.compactDock && s.dockCompact]}>
        <View style={s.addressBar}><Pressable onPress={() => opened ? web.current?.reload() : null} style={s.addressIcon}><Glyph name="search" size={18} color="#a9a4c0" /></Pressable><TextInput value={address} onChangeText={setAddress} onSubmitEditing={() => navigate()} autoCapitalize="none" autoCorrect={false} keyboardType="url" placeholder="Search or enter address" placeholderTextColor="#88849d" style={s.input} returnKeyType="go" /><Pressable onPress={() => navigate()} style={s.go}><Text style={s.goText}>Go</Text></Pressable></View>
        <View style={s.dockActions}>
          <Pressable style={s.dockButton} onPress={() => canBack && web.current?.goBack()}><Glyph name="back" color={canBack ? "#eeeaff" : "#625e75"} /></Pressable>
          <Pressable style={s.dockButton} onPress={() => canForward && web.current?.goForward()}><Glyph name="forward" color={canForward ? "#eeeaff" : "#625e75"} /></Pressable>
          <Pressable style={s.dockButton} onPress={goHome}><Glyph name="home" /></Pressable>
          <Pressable style={s.dockButton} onPress={saveCurrent}><Glyph name="bookmark" color={panel === "saved" ? PURPLE : "#d8d4ef"} /></Pressable>
          <Pressable style={s.dockButton} onPress={() => { setPanel("settings"); setSettingsSection("main"); }}><Glyph name="settings" /></Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#10101a" }, content: { flex: 1, backgroundColor: "#10101a" },
  topBrand: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  brand: { color: "#f7f5ff", fontSize: 27, fontWeight: "800", letterSpacing: 1 }, brandCaption: { color: "#9385ef", fontSize: 8, letterSpacing: 4, marginTop: -2 },
  topAction: { width: 42, height: 42, borderRadius: 15, backgroundColor: "#201e31", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#39344f" },
  home: { flexGrow: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, paddingBottom: 28 },
  heroMark: { width: 78, height: 78, borderRadius: 25, backgroundColor: "#292443", borderWidth: 1, borderColor: "#51477d", alignItems: "center", justifyContent: "center", marginBottom: 24 },
  heroV: { color: "#a9a0ff", fontSize: 51, fontWeight: "800", marginTop: -4 },
  welcome: { color: "#f7f5ff", fontSize: 30, fontWeight: "800", textAlign: "center" }, subtitle: { color: "#aaa5c2", fontSize: 15, marginTop: 10, textAlign: "center" },
  quickActions: { flexDirection: "row", gap: 12, marginTop: 36, width: "100%" }, quickCard: { flex: 1, minHeight: 112, borderRadius: 18, padding: 16, backgroundColor: "#1b192b", borderWidth: 1, borderColor: "#39344f" },
  quickTitle: { color: "#f4f1ff", fontWeight: "700", marginTop: 12 }, quickSub: { color: "#8f8aa8", fontSize: 12, marginTop: 4 },
  dock: { paddingHorizontal: 13, paddingTop: 12, paddingBottom: 9, backgroundColor: "#171525", borderTopWidth: 1, borderColor: "#302c45", gap: 9 },
  dockCompact: { paddingTop: 7, paddingBottom: 5, gap: 5 }, addressBar: { height: 48, flexDirection: "row", alignItems: "center", backgroundColor: "#242238", borderRadius: 16, borderWidth: 1, borderColor: "#494365", paddingHorizontal: 7 },
  addressIcon: { paddingHorizontal: 7 }, input: { flex: 1, color: "#fff", paddingHorizontal: 5, fontSize: 14 }, go: { backgroundColor: PURPLE, paddingHorizontal: 16, paddingVertical: 9, borderRadius: 12 }, goText: { color: "white", fontWeight: "700" },
  dockActions: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", height: 43 }, dockButton: { width: 48, height: 40, alignItems: "center", justifyContent: "center" },
  web: { flex: 1, backgroundColor: "white" }, panelBody: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24 },
  panelHeading: { marginBottom: 20 }, backText: { color: "#a99dfb", fontSize: 14, marginBottom: 14 }, panelTitle: { color: "#f7f5ff", fontSize: 28, fontWeight: "800" },
  menuRow: { flexDirection: "row", alignItems: "center", paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: "#2b283d", gap: 13 },
  menuIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: "#282442", alignItems: "center", justifyContent: "center" }, menuTitle: { color: "#f0edff", fontSize: 15, fontWeight: "600" },
  menuSub: { color: "#8f8aa8", fontSize: 12, marginTop: 4, lineHeight: 17 }, chevron: { color: "#77718e", fontSize: 26, paddingHorizontal: 5 },
  settingRow: { flexDirection: "row", alignItems: "center", paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: "#2b283d" },
  infoCard: { backgroundColor: "#1b192b", borderRadius: 16, borderWidth: 1, borderColor: "#39344f", padding: 18, marginTop: 8 },
  empty: { color: "#8f8aa8", textAlign: "center", marginTop: 48 }, savedRow: { flexDirection: "row", alignItems: "center", paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#2b283d" }
});
