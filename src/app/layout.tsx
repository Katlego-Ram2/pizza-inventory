import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Pizza } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RedirectIfSignedIn from "./RedirectIfSignedIn";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-between items-center px-6 h-16 shadow-sm bg-white border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <Pizza className="w-7 h-7 text-orange-600" />
              <h1 className="font-semibold text-lg text-gray-800">Pizza Inventory Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="text-sm text-gray-700 hover:text-orange-600 transition">Sign In</button>
                </SignInButton>

                <SignUpButton>
                  <button className="bg-orange-600 text-white rounded-full font-medium text-sm px-5 py-2 hover:bg-orange-700 transition">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </header>

       
          <RedirectIfSignedIn />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
