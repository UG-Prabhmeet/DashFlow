import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import "react-day-picker/dist/style.css";
import { Toaster } from "sonner";

const syne = Syne({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-syne",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-dm-sans",
    display: "swap",
});

export const metadata = {
    title: "DashFlow | Agile Project Management App",
    description:
        "DashFlow is a project management app to help teams organize, track, and collaborate on projects efficiently.",
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
                    formButtonPrimary:
                        "bg-purple-600 hover:bg-purple-700 text-white",
                    card: "bg-gray-800",
                    headerTitle: "text-blue-400",
                    headerSubtitle: "text-gray-400",
                },
            }}
        >
            <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
                <body
                    className={`${dmSans.variable} ${syne.variable} animated-dotted-background`}
                >
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Toaster richColors />
                </body>
            </html>
        </ClerkProvider>
    );
}
