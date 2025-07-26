import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import CursorFollower from "@/components/cursor-follower";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import AnimatedBackground from "@/components/AnimatedBackground";

const poppinsSans = Poppins({
  variable: "--font-poppins",
  weight: ["300", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daeralysdev",
  description: "My name is Alejandro, I am a web developer with a passion for creating dynamic and responsive web applications. Explore my portfolio to see my work and learn more about my skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${poppinsSans.variable} ${geistMono.variable} antialiased bg-radial from-primary/20 to-primary/10 scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <AnimatedBackground />
            <CursorFollower />
            <Header />
            {children}
            {/* <Footer /> */}
            <ScrollToTopButton />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
