import { Stack } from "expo-router";

import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "@/lib/use-color-scheme";

export default function PublicLayout() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Welcome",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerTitle: "Sign Up",
        }}
      />
    </Stack>
  );
}
