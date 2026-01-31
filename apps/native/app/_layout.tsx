import "../global.css";
import {
  DarkTheme,
  DefaultTheme,
  type Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useEffect } from "react";
import { Platform, View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalHost } from "@rn-primitives/portal";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";

// Configure Reanimated logger to suppress strict mode warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "@/lib/use-color-scheme";
import { queryClient } from "@/utils/orpc";
import { authClient } from "@/lib/auth-client";
import { useUniwind } from "uniwind";

export const unstable_settings = {
  initialRouteName: "(protected)",
};

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

export default function RootLayout() {
  const { theme } = useUniwind();
  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();
  const segments = useSegments();
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (isSessionLoading) return;

    const inProtectedGroup = segments[0] === "(protected)";

    if (!session && inProtectedGroup) {
      // Redirect to the onboarding page if accessing protected route without session
      // @ts-ignore
      router.replace("/(public)");
    } else if (session && !inProtectedGroup) {
      // Redirect to the dashboard if user is signed in and trying to access public routes
      // @ts-ignore
      router.replace("/(protected)");
    }
  }, [session, isSessionLoading, segments]);

  if (!isColorSchemeLoaded || isSessionLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={NAV_THEME[theme ?? "light"]}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <GestureHandlerRootView className="flex-1">
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(public)" />
              <Stack.Screen name="(protected)" />
              <Stack.Screen
                name="modal"
                options={{
                  title: "Modal",
                  presentation: "modal",
                  headerShown: true,
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <PortalHost />
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
