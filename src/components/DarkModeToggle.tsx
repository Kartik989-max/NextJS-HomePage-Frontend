"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Check for stored user preference in localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    if (storedMode === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode and store preference in localStorage
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
    >
      Toggle Dark Mode
    </Button>
  );
};

export default DarkModeToggle;
