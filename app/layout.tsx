import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Подача заявления для девушки",
  description: "Нежная интерактивная форма-викторина с моментальной проверкой ответов.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
