"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
  Film
} from "lucide-react";

// const sidebarItems = [
//   { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
//   { href: "/social-share", icon: Share2Icon, label: "Social Share" },
//   { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },

// ];

// if (user) {
//   sidebarItems.push({ href: "https://google.com", icon: Film, label: "Post Reel" });
// }

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => router.push("/home");

  const sidebarItems = [
    { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
    { href: "/social-share", icon: Share2Icon, label: "Social Share" },
    { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
  
  ];
  
  if (user) {
    sidebarItems.push({ href: "https://reelify-ivory.vercel.app/", icon: Film, label: "Post Reel" });
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-neutral-800 p-4 transition-transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <ImageIcon className="w-10 h-10 text-primary" />
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-4 px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.href ? "bg-primary text-white" : "hover:bg-neutral-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        {user && (
          <button
            onClick={handleSignOut}
            className="mt-4 w-full px-4 py-2 flex items-center justify-center space-x-2 border rounded-lg hover:bg-red-600"
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-10">
        {/* Navbar */}
        <header className="w-full bg-neutral-800 p-4 flex items-center justify-between">
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(true)}>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-center lg:justify-start">
            <Link href="/" onClick={handleLogoClick} className="text-2xl font-bold">
              ImaginX
            </Link>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={user.imageUrl} alt={user.username || user.emailAddresses[0].emailAddress} />
              </div>
              <span className="hidden sm:block text-sm truncate max-w-xs lg:max-w-md">
                {user.username || user.emailAddresses[0].emailAddress}
              </span>
              <button onClick={handleSignOut} className="text-white">
                <LogOutIcon className="h-6 w-6" />
              </button>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
}
