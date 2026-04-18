import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata = {
  title: "Not A Real Doctor",
  description: "A mental health support chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
