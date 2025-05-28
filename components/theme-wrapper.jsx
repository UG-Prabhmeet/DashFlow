"use client";

import { ThemeProvider } from "./theme-provider";

export function ThemeWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
