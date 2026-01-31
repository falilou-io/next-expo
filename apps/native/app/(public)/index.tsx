import { Link, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

import { Container } from "@/components/container";
import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "@/lib/use-color-scheme";

export default function Onboarding() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;

  return (
    <Container>
      <View className="flex-1 justify-between p-6 pb-12">
        <View className="mt-16">
          <Text
            style={{ color: theme.colors.text }}
            className="text-[32px] font-light"
          >
            Welcome to
          </Text>
          <Text
            style={{ color: theme.colors.primary }}
            className="text-[40px] font-bold mb-4"
          >
            Mono Nooto
          </Text>
          <Text
            style={{ color: theme.colors.text, opacity: 0.7 }}
            className="text-lg leading-6"
          >
            Your all-in-one productivity app.
          </Text>
        </View>

        <View className="gap-4">
          <TouchableOpacity
            style={{ backgroundColor: theme.colors.primary }}
            className="p-4 rounded-lg items-center"
            onPress={() => router.push("/(public)/login")}
          >
            <Text className="font-bold text-base text-white">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ borderColor: theme.colors.border }}
            className="p-4 rounded-lg items-center border"
            onPress={() => router.push("/(public)/sign-up")}
          >
            <Text
              style={{ color: theme.colors.text }}
              className="font-bold text-base"
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
