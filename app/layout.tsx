import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ClerkProviderWrapper from "./providers/ClerkProviderWrapper";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "ImaginX",
  description: "Get your video compressed, Get different scales of images",
  icons: {
    icon: "/logo_fav.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ClerkProviderWrapper>{children}</ClerkProviderWrapper>
      </body>
    </html>
  );
}
