import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StatusBar as rnStatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { GluestackUIProvider } from '~/components/ui/gluestack-ui-provider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="cart" options={{ title: 'Cart', presentation: 'modal' }} /> */}
            <Stack.Screen name="+not-found" />
          </Stack>
        </QueryClientProvider>
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
