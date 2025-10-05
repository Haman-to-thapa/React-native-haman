
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";

import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient'
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { toggleTodo } from "@/convex/todos";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";

type Todo = Doc<"todos">

export default function Index() {

  const { toggleDarkMode, color } = useTheme();

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("")

  const homeStyles = createHomeStyles(color)

  const todos = useQuery(api.todos.getTodos)
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const deleteTodo = useMutation(api.todos.deleteTodo)
  const updateTodo = useMutation(api.todos.updateTodo)

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id })
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo")
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTodo({ id }) }
      ])
    } catch (error) {

    }
  }

  const handleEditTodo = (todo: Todo) => {

    setEditText(todo.text)
    setEditingId(todo._id)
  }

  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editText.trim() })
        setEditText("")
        setEditingId(null)

      } catch (error) {
        console.log("Error updating todo", error);
        Alert.alert("Error", "Failed to update todo")
      }
    }
  }

  const handleCancelEdit = () => {
    setEditText("");
    setEditingId(null)
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {

    const isEditing = editingId === item._id;

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient colors={color.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={item.isCompleted ? color.gradients.success : color.gradients.muted}
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : color.primary,
                  borderWidth: 1,
                },
              ]}
            >
              {
                item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />
              }
            </LinearGradient>

          </TouchableOpacity>
          {
            isEditing ? (
              <View style={homeStyles.editContainer}>
                <TextInput
                  value={editText}
                  onChangeText={setEditText}
                  style={[
                    homeStyles.todoText,
                    item.isCompleted && {
                      textDecorationLine: "line-through",
                      color: color.textMuted,
                      opacity: 0.6
                    }
                  ]}
                />

                <View style={homeStyles.editButton}>
                  <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                    <LinearGradient colors={color.gradients.success} style={homeStyles.editButton}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                      <Text style={homeStyles.editButtonText}>Save</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                    <LinearGradient colors={color.gradients.muted} style={homeStyles.editButton}>
                      <Ionicons name="close" size={16} color="#fff" />
                      <Text style={homeStyles.editButtonText}>Cancel</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                </View>
              </View>
            ) : (<View style={homeStyles.todoTextContainer}>
              <Text
                style={[homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: color.textMuted,
                  opacity: 0.6
                }
                ]}
              >
                {item.text}
              </Text>

              <View style={homeStyles.todoActions}>
                <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                  <LinearGradient colors={color.gradients.warning} style={homeStyles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                  <LinearGradient colors={color.gradients.danger} style={homeStyles.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>)
          }
        </LinearGradient >

      </View >
    )
  }

  return (
    <LinearGradient colors={color.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={color.statusBarStyle} />
      <SafeAreaView
        style={homeStyles.safeArea}
      >
        {/* Header add here */}
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
        // showsVerticalScrollIndicator={false}
        />


      </SafeAreaView>
    </LinearGradient>

  );
}


