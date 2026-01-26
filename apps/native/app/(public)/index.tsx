import { Link, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Container } from "@/components/container";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/use-color-scheme";

export default function Onboarding() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Welcome to</Text>
          <Text style={[styles.appName, { color: theme.primary }]}>
            Mono Nooto
          </Text>
          <Text style={[styles.subtitle, { color: theme.text, opacity: 0.7 }]}>
            Your all-in-one productivity app.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => router.push("/(public)/login")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.outlineButton, { borderColor: theme.border }]}
            onPress={() => router.push("/(public)/sign-up")}
          >
            <Text style={[styles.outlineButtonText, { color: theme.text }]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginTop: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  actions: {
    gap: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  outlineButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  outlineButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
