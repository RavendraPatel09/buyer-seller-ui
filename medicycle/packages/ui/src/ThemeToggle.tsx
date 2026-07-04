import { Moon, Sun } from "lucide-react";
import { Button } from "./Button/Button";

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <Button
      variant="outline"
      className="w-9 h-9 p-0 rounded-full bg-background/50 backdrop-blur border border-border/50 hover:bg-muted relative flex items-center justify-center overflow-hidden"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-4 w-4 transition-all duration-300 absolute scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
      <Moon className="h-4 w-4 transition-all duration-300 absolute scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
