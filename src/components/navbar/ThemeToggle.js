"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-9 w-9">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 w-9 transition-colors duration-200"
          style={{
            color: resolvedTheme === 'dark' ? '#cdd6f4' : '#11111b',
            backgroundColor: 'transparent'
          }}
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="border"
        style={{
          backgroundColor: resolvedTheme === 'dark' ? '#313244' : '#eff1f5',
          borderColor: resolvedTheme === 'dark' ? '#585b70' : '#9ca0b0'
        }}
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="cursor-pointer transition-colors duration-200"
          style={{
            color: resolvedTheme === 'dark' ? '#cdd6f4' : '#4c4f69'
          }}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="cursor-pointer transition-colors duration-200"
          style={{
            color: resolvedTheme === 'dark' ? '#cdd6f4' : '#4c4f69'
          }}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="cursor-pointer transition-colors duration-200"
          style={{
            color: resolvedTheme === 'dark' ? '#cdd6f4' : '#4c4f69'
          }}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
