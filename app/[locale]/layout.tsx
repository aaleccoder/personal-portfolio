import type { Metadata } from "next";
import { Sora, Space_Grotesk, Orbitron } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import CursorFollower from "@/components/cursor-follower";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import AnimatedBackground from "@/components/AnimatedBackground";
import Image from "next/image";
import { Toaster } from "sonner";

const sora = Sora({
  variable: "--font-sora",
  weight: ["300", "500", "700", "800"],
  subsets: ["latin"]
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ralecodes",
  description: "My name is Alejandro, I am a web developer with a passion for creating dynamic and responsive web applications. Explore my portfolio to see my work and learn more about my skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const flipOptions = [
    '', // no flip
    'scaleX(-1)', // horizontal flip
    'scaleY(-1)', // vertical flip
    'scaleX(-1) scaleY(-1)', // both flips
  ];
  const randomFlip = flipOptions[Math.floor(Math.random() * flipOptions.length)];

  // Parallax animation keyframes
  const parallaxStyle = `
    @keyframes parallaxMove {
      0% { transform: ${randomFlip} translateY(0px) scale(1); }
      25% { transform: ${randomFlip} translateY(-20px) scale(1.03); }
      50% { transform: ${randomFlip} translateY(0px) scale(1.06); }
      75% { transform: ${randomFlip} translateY(20px) scale(1.03); }
      100% { transform: ${randomFlip} translateY(0px) scale(1); }
    }
    .parallax-bg {
      animation: parallaxMove 30s ease-in-out infinite;
    }
  `;
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className={`${sora.variable} ${orbitron.variable} ${spaceGrotesk.variable} antialiased scroll-smooth `} style={{ position: "relative", minHeight: "100vh" }}>
        <style>{parallaxStyle}</style>
        <div style={{ position: "fixed", inset: 0, zIndex: 0, width: "100vw", height: "100vh", pointerEvents: "none" }} >
          <Image
            src="/localhost_3000_en.png"
            alt="Background"
            fill
            className="parallax-bg"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority={true}
          />
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <CursorFollower />
            <Header />
            <div style={{ position: "relative", zIndex: 1 }} className="mt-12">
              {children}
            </div>
            <ScrollToTopButton />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
