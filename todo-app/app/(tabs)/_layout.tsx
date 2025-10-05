import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import useTheme from '@/hooks/useTheme'

const TabsLayout = () => {
  const { color } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.textMuted,
        tabBarStyle: {
          backgroundColor: color.surface,
          borderTopWidth: 1,
          borderTopColor: color.border,
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600"
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Todos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='flash-outline' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' size={size} color={color} />
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout