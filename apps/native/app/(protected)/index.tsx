import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";
import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "@/lib/use-color-scheme";
import { queryClient, orpc } from "@/utils/orpc";
import { AccordionPreview } from "@/components/TestAccordion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());
  const privateData = useQuery(orpc.privateData.queryOptions());
  const isConnected = healthCheck?.data === "OK";
  const isLoading = healthCheck?.isLoading;
  const { data: session } = authClient.useSession();

  return (
    <Container>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            BETTER T STACK
          </Text>

          {session?.user ? (
            <View
              style={[
                styles.userCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.userHeader}>
                <Text style={[styles.userText, { color: theme.colors.text }]}>
                  Welcome,{" "}
                  <Text style={styles.userName}>{session.user.name}</Text>
                </Text>
              </View>
              <Text
                style={[
                  styles.userEmail,
                  { color: theme.colors.text, opacity: 0.7 },
                ]}
              >
                {session.user.email}
              </Text>
              <TouchableOpacity
                style={[
                  styles.signOutButton,
                  { backgroundColor: theme.colors.notification },
                ]}
                onPress={() => {
                  authClient.signOut();
                  queryClient.invalidateQueries();
                }}
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              System Status
            </Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: isConnected ? "#10b981" : "#ef4444" },
                ]}
              />
              <View style={styles.statusContent}>
                <Text
                  style={[styles.statusTitle, { color: theme.colors.text }]}
                >
                  ORPC Backend
                </Text>
                <Text
                  style={[
                    styles.statusText,
                    { color: theme.colors.text, opacity: 0.7 },
                  ]}
                >
                  {isLoading
                    ? "Checking connection..."
                    : isConnected
                      ? "Connected to API"
                      : "API Disconnected"}
                </Text>
              </View>
            </View>
          </View>
          <AccordionPreview />
          <Button>
            <Text>Click Me</Text>
          </Button>
          <View
            style={[
              styles.privateDataCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Private Data
            </Text>
            {privateData && (
              <Text
                style={[
                  styles.privateDataText,
                  { color: theme.colors.text, opacity: 0.7 },
                ]}
              >
                {privateData.data?.message}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
  },
  userHeader: {
    marginBottom: 8,
  },
  userText: {
    fontSize: 16,
  },
  userName: {
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 12,
  },
  signOutButton: {
    padding: 12,
  },
  signOutText: {
    color: "#ffffff",
  },
  statusCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusIndicator: {
    height: 8,
    width: 8,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 12,
  },
  privateDataCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
  },
  privateDataText: {
    fontSize: 14,
  },
});
