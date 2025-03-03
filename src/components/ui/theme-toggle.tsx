import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/ui/theme-provider"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "react-i18next"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { t } = useTranslation()

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    
    toast({
      title: t('theme.changed'),
      description: t(`theme.${newTheme}ModeEnabled`),
      duration: 2000,
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={t('theme.toggle')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
} 