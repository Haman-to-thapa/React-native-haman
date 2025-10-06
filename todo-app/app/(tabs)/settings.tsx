import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/setting.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from '@/components/ProgressBar';
import Preference from '@/components/Preference';
import DangerZone from '@/components/DangerZone';

const SettingsScreen = () => {



  const { color } = useTheme();
  const settingsStyles = createSettingsStyles(color)

  return (
    <LinearGradient colors={color.gradients.background} style={settingsStyles.container}>
      <SafeAreaView style={settingsStyles.safeArea}>
        {/* Header */}
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient colors={color.gradients.primary} style={settingsStyles.iconContainer}>
              <Ionicons name='settings' size={28} color="#ffffff" />
            </LinearGradient>
            <Text style={settingsStyles.title}>Setttings</Text>
          </View>
        </View>
        <ScrollView style={settingsStyles.scrollView} contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}>
          <ProgressBar />
          {/* PREFERENCE */}
          <Preference />
          {/* DangerZone */}
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingsScreen