import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./components/query/react-query-provider";
import ClientLayout from "./client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Countries",
  description: "REST Countries API with color theme switcher",
  icons: {
    icon: "/restcountries.png",
  },
  openGraph: {
    title: "Countries",
    description: "REST Countries API with color theme switcher",
    url: "https://restcountries-best.vercel.app",
    siteName: "REST Countries developed by @_iamDeeBaba",
    images: [
      {
        url: "https://media-hosting.imagekit.io/e9f9c09689254d7f/restcountries.png?Expires=1841245245&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=X9dKjawzO0zvE3lkn5~I~FPIcUgLcwkKzZ~c-alDbHUsH4W8ydElLlIqbn63f2xB4~GWE8-1aqbdn~XfobcT5XhPDJP5t7oTPiDTIhBZbpfozVsZ9a2EhRanrutHmTmLRe06L2OkQFVtsI2vdWVaGTc45OaB8d~I6fd5sBuRuDhr4mYCnn3WXX~nPfSNch8LKPrY4Vu9OKMv9rqRxTgoXhgMIj4bo6S~PXEt7nkZfGkYW4Cn2-aWAcLhYV3G7yoXyyV6Etx0da6qNA6ViUQHL6OFeE~wyOx5F4qm9x4wj1YEXcA4GavK2ZI7I5hzaXEKyjqQSDaBFjGbAwWWD2WkcA__", // MUST be absolute URL
        width: 1200,
        height: 630,
        alt: "Rest Countries banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // or "summary"
    title: "DeeBaba - Frontend Engineer",
    description: "Next.js | TypeScript",
    images: [
      "https://res.cloudinary.com/dbez0fyq6/image/upload/v1736849014/olfmeo9fpbmmmhtqmld1.jpg",
    ],
    creator: "@_iamDeeBaba",
  },
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
