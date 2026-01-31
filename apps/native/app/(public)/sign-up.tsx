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

export default function SignUpScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp() {
    setIsLoading(true);
    setError(null);

    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign up");
          setIsLoading(false);
        },
        onSuccess() {
          setName("");
          setEmail("");
          setPassword("");
          queryClient.refetchQueries();
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
          placeholder="Name"
          placeholderTextColor={theme.colors.text}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={{
            color: theme.colors.text,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.background,
          }}
          className="h-12 border rounded-lg px-4 text-base mb-4"
          placeholder="Email"
          placeholderTextColor={theme.colors.text}
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSignUp}
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
            <Text className="font-bold text-base text-white">Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
