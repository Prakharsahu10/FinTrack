import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  // Check user only if authenticated (will return null on public pages)
  try {
    await checkUser();
  } catch (error) {
    // User is not authenticated, continue rendering public header
    console.log("Public page - user not authenticated");
  }

  return (
    <header className="fixed top-0 w-full bg-black/70 backdrop-blur-lg z-50 transition-all duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo1.png"}
            alt="FinTrack Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a href="#features" className="text-gray-300 hover:text-teal-400">
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-teal-400"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-gray-700 text-black hover:text-teal-400 hover:border-teal-500 bg-white hover:bg-white"
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white border-0">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
