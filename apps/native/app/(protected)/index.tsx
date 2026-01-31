import { useQuery } from "@tanstack/react-query";
import { ScrollView, View } from "react-native";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import { orpc, queryClient } from "@/utils/orpc";

export default function Home() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());
  const privateData = useQuery(orpc.privateData.queryOptions());
  const isConnected = healthCheck?.data === "OK";
  const isLoading = healthCheck?.isLoading;
  const { data: session } = authClient.useSession();

  return (
    <Container>
      <ScrollView contentContainerClassName="p-4 gap-4">
        <Text className="text-2xl font-bold">Hello Minimal</Text>

        {session?.user ? (
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {session.user.name}</CardTitle>
              <CardDescription>{session.user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onPress={() => {
                  authClient.signOut();
                  queryClient.invalidateQueries();
                }}
              >
                <Text>Sign Out</Text>
              </Button>
            </CardContent>
          </Card>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="flex-row items-center gap-2">
              <View
                className={`h-2 w-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-red-500"}`}
              />
              <View>
                <Text className="font-bold text-sm">ORPC Backend</Text>
                <Text className="text-muted-foreground text-xs">
                  {isLoading
                    ? "Checking connection..."
                    : isConnected
                      ? "Connected to API"
                      : "API Disconnected"}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Private Data</CardTitle>
          </CardHeader>
          <CardContent>
            {privateData.data ? (
              <Text>{privateData.data.message}</Text>
            ) : (
              <Text className="text-muted-foreground italic">
                No data (Sign in to view)
              </Text>
            )}
          </CardContent>
        </Card>
      </ScrollView>
    </Container>
  );
}
