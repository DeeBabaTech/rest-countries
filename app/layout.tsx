import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./components/query/react-query-provider";
import ClientLayout from "./client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Countries",
  description: "REST Countries API with color theme switcher",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ClientLayout>{children}</ClientLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
