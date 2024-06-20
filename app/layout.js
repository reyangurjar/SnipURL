import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SnipUrl: A Powerful URL Shortener",
  description: "Shorten your links with SnipUrl, the powerful and user-friendly URL shortener. Get going with your growth curve with this handy tool.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
