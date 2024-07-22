import 'react-native-gesture-handler';

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import { UnauthorizedModal } from "@/components/modals/unauthorizedModal";
import { reactotron } from "@/config";
import { AuthProvider } from "@/contexts/auth";
import { PreloadVideo, VideoProvider } from '@/contexts/video';
import { queryClient } from "@/lib";
import Routes from "@/routes";
import customTheme from "@/styles/native-base-theme";
import * as font from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "react-query";

if (__DEV__) {
  reactotron.connect();
}

export default function App() {

  const [fontsLoaded] = useFonts({
    trin: font.Roboto_300Light,
    regular: font.Roboto_400Regular,
    semi_bold: font.Roboto_500Medium,
    bold: font.Roboto_700Bold,
    black: font.Roboto_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <VideoProvider>
        <NavigationContainer>
          <AuthProvider>
            <StatusBar hidden style="light" animated />
            <NativeBaseProvider theme={customTheme} >
              <GestureHandlerRootView style={{ flex: 1 }} >
                <Routes />
              </GestureHandlerRootView>
            </NativeBaseProvider>
            <UnauthorizedModal />
          </AuthProvider>
        </NavigationContainer>
        <PreloadVideo />
      </VideoProvider>
    </QueryClientProvider>
  );
}

