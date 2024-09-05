import "./globals.css";
import type { Metadata } from "next";
import { Overpass_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/AppContext";

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
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
