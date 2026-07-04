import { ThemeToggle } from '@medicycle/ui'
import { useTheme } from '../../lib/theme/ThemeContext'
export function ThemeToggleWrapped() {
  const { theme, setTheme } = useTheme()
  return <ThemeToggle theme={theme} setTheme={setTheme} />
}
