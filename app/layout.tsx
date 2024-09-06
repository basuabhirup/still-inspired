import "./globals.css";
import type { Metadata } from "next";
import { Overpass_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/AppContext";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavButton } from "@/components/nav-button";

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  variable: "--font-overpass-mono",
});

export const metadata: Metadata = {
  title: "Still A Work of Art",
  description: "Image prompts to ignite your artistic creativity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${overpassMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AppProvider>
            <main className="flex min-h-screen flex-col items-center p-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
              <div className="w-full max-w-4xl flex justify-between mb-4">
                <NavButton />
                <ThemeToggle />
              </div>
              {children}
              <footer className="mt-16 text-center text-sm">
                Made by Anusha & Abhirup <br />
                in pursuit of art-block-free days.
              </footer>
            </main>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
