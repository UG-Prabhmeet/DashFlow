import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "CuminSeed",
  description: "Project Management Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
