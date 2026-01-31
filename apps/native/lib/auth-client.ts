import { expoClient } from "@better-auth/expo/client";
import { env } from "@minimal/env/native";
import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const getBaseUrl = () => {
  const url = env.EXPO_PUBLIC_SERVER_URL;

  if (Platform.OS === "web") return url;

  if (url.includes("localhost")) {
    const debuggerHost = Constants.expoConfig?.hostUri;
    const localhost = debuggerHost?.split(":")[0];

    if (localhost) {
      return url.replace("localhost", localhost);
    }

    if (Platform.OS === "android") {
      return url.replace("localhost", "10.0.2.2");
    }
  }

  return url;
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    expoClient({
      scheme: Constants.expoConfig?.scheme as string,
      storagePrefix: Constants.expoConfig?.scheme as string,
      storage: SecureStore,
    }),
  ],
});
