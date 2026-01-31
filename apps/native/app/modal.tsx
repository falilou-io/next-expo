import { Text, View } from "react-native";

import { Container } from "@/components/container";
import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "@/lib/use-color-scheme";

export default function Modal() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;

  return (
    <Container>
      <View className="flex-1 p-4">
        <View className="mb-4">
          <Text
            style={{ color: theme.colors.text }}
            className="text-xl font-bold"
          >
            Modal
          </Text>
        </View>
      </View>
    </Container>
  );
}
