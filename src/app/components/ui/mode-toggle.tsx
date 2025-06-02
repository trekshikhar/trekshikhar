// /components/mode-toggle.tsx
"use client"
import { useState } from "react"

export const ModeToggle = () => {
  const [mode, setMode] = useState("light")

  return (
    <button
      className="border px-3 py-1 rounded-md text-sm"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {mode === "light" ? "🌞 Light" : "🌚 Dark"}
    </button>
  )
}
