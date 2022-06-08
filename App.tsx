import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { useFonts } from "@expo-google-fonts/bangers";
import SocialContextProvider from "./src/context/SocialContextProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    "Bangers-Regular": require("./src/assets/fonts/Bangers-Regular.ttf"),
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <SocialContextProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SocialContextProvider>
      </SafeAreaProvider>
    );
  }
}
