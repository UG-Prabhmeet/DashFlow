import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import "react-day-picker/dist/style.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CuminSeed",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#1a202c",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
          card: "bg-gray-800",
          headerTitle: "text-blue-400",
          headerSubtitle: "text-gray-400",
        },
      }}
    >
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body className={`${inter.className} animated-dotted-background`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            {/* footer */}
            <footer className="bg-black text-white py-10 text-center relative">
              <div className="container mx-auto px-4">
                <h1 className="text-6xl font-extrabold tracking-wide">
                  DashFlow
                </h1>
                <p className="text-lg mt-2">©2025 All rights reserved.</p>
                <p className="text-lg">Site by Prabhmeet Singh.</p>

                {/* for email support */}

                {/* <div className="mt-6 text-center">
								<p className="text-xl font-medium">Need help managing your finances?</p>
								<a href="mailto:support@financetracker.com" className="text-4xl font-bold underline">
									support@financetracker.com
								</a>
								</div> */}
                <div className="absolute top-4 right-4 text-2xl">©</div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
