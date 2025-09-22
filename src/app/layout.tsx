import StoreProvider from "@/components/shared/store-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins =  Poppins({
  weight:["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
})
export const metadata: Metadata = {
  title: "Numbers Game",
  description: "A real-time  numbers game built with Next.js, Socket.io, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <StoreProvider>
        <Toaster
              toastOptions={{
                style: {
                  fontSize: '10px'
                },
                duration: 3200
              }}
              position="top-right"
            />
          {children}
        </StoreProvider>
        
      </body>
    </html>
  );
}
