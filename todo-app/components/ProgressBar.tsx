import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/setting.styles'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const ProgressBar = () => {

  const { color } = useTheme()
  const settingsStyles = createSettingsStyles(color);

  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0;
  const activeTodo = totalTodos - completedTodos;


  return (
    <LinearGradient colors={color.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Progress Status</Text>
      <View style={settingsStyles.statsContainer}>
        <LinearGradient colors={color.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: color.primary }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient colors={color.gradients.primary} style={settingsStyles.statIcon}>
              <Ionicons name='list' size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View >
            <Text style={settingsStyles.statNumber}>{totalTodos}</Text>
            <Text style={settingsStyles.statLabel}>Total Todos</Text>
          </View>
        </LinearGradient>

        {/* Compoleted todo */}
        <LinearGradient
          colors={color.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: color.success }]}>
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient colors={color.gradients.success} style={settingsStyles.statIcon}>
              <Ionicons name='checkmark-circle' size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyles.statNumber}>{completedTodos}</Text>
            <Text style={settingsStyles.statLabel}>Completed</Text>
          </View>
        </LinearGradient>
        {/* Active Todos */}
        <LinearGradient
          colors={color.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: color.warning }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient colors={color.gradients.warning} style={settingsStyles.statIcon}>
              <Ionicons name='time' size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyles.statNumber}>{activeTodo}</Text>
            <Text style={settingsStyles.statLabel}>Active</Text>
          </View>
        </LinearGradient>
      </View>

    </LinearGradient>
  )
}

export default ProgressBar