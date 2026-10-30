import { AppRegistry } from "react-native";
import App from "./App";

AppRegistry.registerComponent("VeyraBrowser", () => App);
AppRegistry.runApplication("VeyraBrowser", {
  rootTag: document.getElementById("root"),
});
