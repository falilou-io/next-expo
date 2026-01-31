import type { AppRouterClient } from "@minimal/api/routers/index";

import { env } from "@minimal/env/native";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import { Platform } from "react-native";

import { authClient } from "@/lib/auth-client";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
    },
  }),
});

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

export const link = new RPCLink({
  url: `${getBaseUrl()}/api/rpc`,
  headers() {
    const headers = new Map<string, string>();
    const cookies = authClient.getCookie();
    if (cookies) {
      headers.set("Cookie", cookies);
    }
    return Object.fromEntries(headers);
  },
});

export const client: AppRouterClient = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
