import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Himanshu Choudhary - Flutter Developer",
  description: "Flutter Developer | Crafting Beautiful & Performant Mobile Apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
