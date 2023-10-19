import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { selectRoute } from "./services/router";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return <NavigationContainer>{selectRoute(false)}</NavigationContainer>;
}
