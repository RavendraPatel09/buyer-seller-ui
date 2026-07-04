import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function getSystemTheme() {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (window.localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() => getSystemTheme());

  useEffect(() => {
    const root = window.document.documentElement;
    const nextTheme = theme === "system" ? getSystemTheme() : theme;
    const previousTheme = root.classList.contains("dark") ? "dark" : "light";
    setResolvedTheme(nextTheme);

    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);

    if (typeof document.startViewTransition === "function" && previousTheme !== nextTheme) {
      root.classList.add("theme-transitioning");
      const transition = document.startViewTransition(() => {
        root.classList.remove("light", "dark");
        root.classList.add(nextTheme);
      });
      transition.finished.finally(() => root.classList.remove("theme-transitioning"));
    }
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        const next = getSystemTheme();
        setResolvedTheme(next);
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(next);
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme: Theme) => {
        window.localStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);
      },
    }),
    [resolvedTheme, storageKey, theme]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
