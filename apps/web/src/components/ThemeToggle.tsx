import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    } else {
      setIsDarkMode(theme === 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative h-10 w-10 rounded-md hover:bg-secondary flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden`}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-label="Toggle theme"
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300
            ${isDarkMode
            ? 'translate-y-10 opacity-0 rotate-90'
            : 'translate-y-0 opacity-100 rotate-0'
          }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300
            ${isDarkMode
            ? 'translate-y-0 opacity-100 rotate-0'
            : 'translate-y-10 opacity-0 rotate-90'
          }`}
      />
    </button>
  );
}