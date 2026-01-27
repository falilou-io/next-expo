import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

import { authClient } from "@/lib/auth-client";
import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "@/lib/use-color-scheme";
import { queryClient } from "@/utils/orpc";

export default function LoginScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFormChange(field: "email" | "password", value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleLogin() {
    setIsLoading(true);
    setError(null);

    await authClient.signIn.email(
      {
        email: form.email,
        password: form.password,
      },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign in");
          setIsLoading(false);
        },
        onSuccess() {
          setForm({ email: "", password: "" });
          queryClient.refetchQueries();
          // Redirect will be handled by the root layout listener
        },
        onFinished() {
          setIsLoading(false);
        },
      },
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        {error ? (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: theme.colors.notification + "20" },
            ]}
          >
            <Text
              style={[styles.errorText, { color: theme.colors.notification }]}
            >
              {error}
            </Text>
          </View>
        ) : null}

        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.background,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={theme.colors.text}
          value={form.email}
          onChangeText={(value) => handleFormChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.background,
            },
          ]}
          placeholder="Password"
          placeholderTextColor={theme.colors.text}
          value={form.password}
          onChangeText={(value) => handleFormChange("password", value)}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.primary,
              opacity: isLoading ? 0.5 : 1,
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
