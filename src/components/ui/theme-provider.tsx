
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { type ThemeProviderProps } from "next-themes/dist/types"

type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
  clearThemePreference: () => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove old theme class
    root.classList.remove("light", "dark")
    
    // Add new theme class
    root.classList.add(theme)
    
    // Save theme to localStorage
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const clearThemePreference = () => {
    localStorage.removeItem(storageKey)
    setTheme(defaultTheme)
  }

  const value = {
    theme,
    setTheme: (newTheme: string) => {
      setTheme(newTheme)
    },
    clearThemePreference
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return context
}
