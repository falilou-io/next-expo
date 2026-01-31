import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
    <ScrollView contentContainerClassName="p-4 flex-1 pt-8">
      <View
        style={{
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        }}
        className="p-6 rounded-xl border"
      >
        {error ? (
          <View
            style={{ backgroundColor: theme.colors.notification + "20" }}
            className="p-3 rounded-lg mb-4"
          >
            <Text
              style={{ color: theme.colors.notification }}
              className="text-sm"
            >
              {error}
            </Text>
          </View>
        ) : null}

        <TextInput
          style={{
            color: theme.colors.text,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.background,
          }}
          className="h-12 border rounded-lg px-4 text-base mb-4"
          placeholder="Email"
          placeholderTextColor={theme.colors.text}
          value={form.email}
          onChangeText={(value) => handleFormChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={{
            color: theme.colors.text,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.background,
          }}
          className="h-12 border rounded-lg px-4 text-base mb-4"
          placeholder="Password"
          placeholderTextColor={theme.colors.text}
          value={form.password}
          onChangeText={(value) => handleFormChange("password", value)}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={{
            backgroundColor: theme.colors.primary,
            opacity: isLoading ? 0.5 : 1,
          }}
          className="h-12 rounded-lg justify-center items-center mt-2"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="font-bold text-base text-white">Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
