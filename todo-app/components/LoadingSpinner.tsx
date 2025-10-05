import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme"
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";


const LoadingSpinner = () => {

  const { color } = useTheme();
  const homeStyles = createHomeStyles(color)

  return (
    <LinearGradient colors={color.gradients.background} style={homeStyles.container}>
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size={"large"} color={color.primary} />
        <Text style={homeStyles.loadingText}>Loading your todos...</Text>
      </View>

    </LinearGradient>
  )
}

export default LoadingSpinner;