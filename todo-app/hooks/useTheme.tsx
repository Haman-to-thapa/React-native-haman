import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'


export interface ColorSchema {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string]
    muted: [string, string];
    empty: [string, string]
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: 'light-content' | "dark-content"
}


const lightTheme: ColorSchema = {
  bg: "#f8fafc",
  surface: "#ffffff",
  text: "#1e293b",
  textMuted: "#64748b",
  border: "#e2e8f0",
  primary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  shadow: "#000000",

  gradients: {
    background: ["#f8fafc", "#e2e8f0"],
    surface: ["#ffffff", "#f8fafc"],
    primary: ["#3b82f6", "#1d4ed8"],
    success: ["#10b981", "#059669"],
    warning: ['#f59e0b', "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#9ca3af", "#6b7280"],
    empty: ["#f3f4f6", "#e5e7eb"]
  },

  backgrounds: {
    input: "#ffffff",
    editInput: "#ffffff"
  },

  statusBarStyle: "dark-content" as const,
};

const darkTheme: ColorSchema = {
  bg: "#0f172a",
  surface: "#1e293b",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  border: "#334155",
  primary: "#69a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  danger: "#f87171",
  shadow: "rgba(0,0,0,0.0)",

  gradients: {
    background: ["#0f172a", "#1e293b"],
    surface: ["#1e293b", "#334155"],
    primary: ["#3b82f6", "#1d4ed8"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#475569", "#334155"],
    empty: ["#1e293b", "#0f172a"]
  },

  backgrounds: {
    input: "#1e293b",
    editInput: "#334155"
  },

  statusBarStyle: "light-content" as const
};

// function types was defined here

interface ThemeContextType {
  isDarkMode: boolean,
  toggleDarkMode: () => void;
  color: ColorSchema

}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined)


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value))
    })
  }, [])

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode))
  };

  const color = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, color }}>
      {children}
    </ThemeContext.Provider>
  )

}

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}