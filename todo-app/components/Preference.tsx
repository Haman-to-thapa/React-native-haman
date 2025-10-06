import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { createSettingsStyles } from '@/assets/styles/setting.styles';
import { Ionicons } from '@expo/vector-icons';

const Preference = () => {

  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotification, setIsNotification] = useState(true)

  const { isDarkMode, toggleDarkMode, color } = useTheme()

  const settingsStyles = createSettingsStyles(color)

  return (
    <LinearGradient colors={color.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Preference</Text>
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={color.gradients.primary} style={settingsStyles.settingIcon}>
            <Ionicons name='moon' size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={"#fff"}
          trackColor={{ false: color.border, true: color.primary }}
          ios_backgroundColor={color.border}
        />
      </View>

      {/* Notification */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={color.gradients.warning} style={settingsStyles.settingIcon}>
            <Ionicons name='notifications' size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={isNotification}
          onValueChange={() => setIsNotification(!isNotification)}
          thumbColor={"#fff"}
          trackColor={{ false: color.border, true: color.warning }}
          ios_backgroundColor={color.border}
        />
      </View>

      {/* Auto Sync */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={color.gradients.success} style={settingsStyles.settingIcon}>
            <Ionicons name='sync' size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          onValueChange={() => setIsAutoSync(!isAutoSync)}
          thumbColor={"#fff"}
          trackColor={{ false: color.border, true: color.success }}
          ios_backgroundColor={color.border}
        />
      </View>

    </LinearGradient>
  )
}

export default Preference