import '../global.css';

import { Slot, Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GluestackUIProvider } from '~/components/ui/gluestack-ui-provider';
import { Text } from '~/components/ui/text';
import { StatusBar as rnStatusBar } from "react-native"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="cart" options={{ title: 'Cart', presentation: 'modal' }} /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: rnStatusBar.currentHeight,
    backgroundColor: 'white',
  },
});
