import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";

import { Container } from "@/components/container";
import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "@/lib/use-color-scheme";
import { orpc } from "@/utils/orpc";

export default function TodosScreen() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;
  const [newTodoText, setNewTodoText] = useState("");

  const todos = useQuery(orpc.todo.getAll.queryOptions());
  const createMutation = useMutation(
    orpc.todo.create.mutationOptions({
      onSuccess: () => {
        todos.refetch();
        setNewTodoText("");
      },
    }),
  );
  const toggleMutation = useMutation(
    orpc.todo.toggle.mutationOptions({
      onSuccess: () => {
        todos.refetch();
      },
    }),
  );
  const deleteMutation = useMutation(
    orpc.todo.delete.mutationOptions({
      onSuccess: () => {
        todos.refetch();
      },
    }),
  );

  function handleAddTodo() {
    if (newTodoText.trim()) {
      createMutation.mutate({ text: newTodoText });
    }
  }

  function handleToggleTodo(id: number, completed: boolean) {
    toggleMutation.mutate({ id, completed: !completed });
  }

  function handleDeleteTodo(id: number) {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteMutation.mutate({ id }),
      },
    ]);
  }

  const isLoading = todos?.isLoading;
  const completedCount = todos?.data?.filter((t) => t.completed).length || 0;
  const totalCount = todos?.data?.length || 0;

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <View className="mb-4">
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: theme.colors.text }}
              className="text-2xl font-bold"
            >
              Todo List
            </Text>
            {totalCount > 0 && (
              <View
                style={{ backgroundColor: theme.colors.primary }}
                className="px-2 py-1"
              >
                <Text className="text-white text-xs">
                  {completedCount}/{totalCount}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          }}
          className="border p-3 mb-4"
        >
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <TextInput
                value={newTodoText}
                onChangeText={setNewTodoText}
                placeholder="Add a new task..."
                placeholderTextColor={theme.colors.text}
                editable={!createMutation.isPending}
                onSubmitEditing={handleAddTodo}
                returnKeyType="done"
                style={{
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                }}
                className="border p-3 text-base"
              />
            </View>
            <TouchableOpacity
              onPress={handleAddTodo}
              disabled={createMutation.isPending || !newTodoText.trim()}
              style={{
                backgroundColor:
                  createMutation.isPending || !newTodoText.trim()
                    ? theme.colors.border
                    : theme.colors.primary,
                opacity:
                  createMutation.isPending || !newTodoText.trim() ? 0.5 : 1,
              }}
              className="p-3 justify-center items-center"
            >
              {createMutation.isPending ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Ionicons name="add" size={24} color="#ffffff" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {isLoading && (
          <View className="items-center justify-center py-8">
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text
              style={{ color: theme.colors.text, opacity: 0.7 }}
              className="mt-4 text-sm"
            >
              Loading todos...
            </Text>
          </View>
        )}

        {todos?.data && todos.data.length === 0 && !isLoading && (
          <View
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            }}
            className="border p-8 items-center justify-center"
          >
            <Ionicons
              name="checkbox-outline"
              size={64}
              color={theme.colors.text}
              style={{ opacity: 0.5, marginBottom: 16 }}
            />
            <Text
              style={{ color: theme.colors.text }}
              className="text-base font-bold mb-2"
            >
              No todos yet
            </Text>
            <Text
              style={{ color: theme.colors.text, opacity: 0.7 }}
              className="text-sm text-center"
            >
              Add your first task to get started!
            </Text>
          </View>
        )}

        {todos?.data && todos.data.length > 0 && (
          <View className="gap-2">
            {todos.data.map((todo) => (
              <View
                key={todo.id}
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                }}
                className="border p-3"
              >
                <View className="flex-row items-center gap-3">
                  <TouchableOpacity
                    onPress={() => handleToggleTodo(todo.id, todo.completed)}
                    style={{ borderColor: theme.colors.border }}
                    className="w-5 h-5 border-2 justify-center items-center"
                  >
                    {todo.completed && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={theme.colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                  <View className="flex-1">
                    <Text
                      style={[
                        { color: theme.colors.text },
                        todo.completed && {
                          textDecorationLine: "line-through",
                          opacity: 0.5,
                        },
                      ]}
                      className="text-base"
                    >
                      {todo.text}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteTodo(todo.id)}
                    className="p-2"
                  >
                    <Ionicons
                      name="trash-outline"
                      size={24}
                      color={theme.colors.notification}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
