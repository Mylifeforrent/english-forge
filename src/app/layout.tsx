import type { Metadata } from "next";

import "./styles.css";

export const metadata: Metadata = {
  title: "English Forge",
  description: "Chinese to English output practice for software developers."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
