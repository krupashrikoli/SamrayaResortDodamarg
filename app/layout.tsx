import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samrāya | Lifestyle & Wellness Resort",
  description: "Lifestyle and Wellness Resort — by GHD Hotels. Deployed at samraya.ghdhotels.in",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
