"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, MessageSquare, Menu, X } from "lucide-react";
import Image from "next/image";

// YANGI VIDEOLAR BO'LIMI QO'SHILDI
const navLinks = [
  { name: "Podcast haqida", href: "/about" },
  { name: "Epizodlar", href: "/episodes" },
  { name: "Videolar", href: "/videos" },
  { name: "Odamlar", href: "/people" },
  { name: "Iqtiboslar", href: "/quotes" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-3 z-50 px-3 sm:px-4">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between rounded-[2.2rem] border border-border/70 bg-card/90 px-4 py-2.5 shadow-2xl backdrop-blur-xl sm:px-6 sm:py-3.5">
        
        <Link href="/" className="flex items-center gap-2.5 transition active:scale-95 group">
          <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center overflow-hidden rounded-xl bg-transparent">
            <Image
              src="/logo.png" 
              alt="Lolazor Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <span className="hidden text-lg font-extrabold text-text-main sm:block sm:text-xl transition group-hover:text-lolazor-sky">
            Lolazor
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-background text-lolazor-sky border border-border/80 shadow-sm"
                    : "text-text-muted hover:text-text-main hover:bg-background/50 border border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {mounted ? (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background text-text-muted transition hover:border-lolazor-sky hover:text-lolazor-sky active:scale-95"
              aria-label="Rejimni o'zgartirish"
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
          ) : (
            <div className="h-10 w-10" />
          )}
          
          <Link
            href="/feedback"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background text-text-muted transition hover:border-lolazor-sky hover:text-lolazor-sky active:scale-95"
            title="Fikr va takliflar"
          >
            <MessageSquare size={19} />
          </Link>

          <Link
            href="/links"
            className="hidden sm:inline-flex rounded-full bg-[#F59E0B] px-6 py-2.5 text-sm font-bold text-black shadow-md transition hover:bg-[#F59E0B]/90"
          >
            Havolalar
          </Link>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background text-text-main lg:hidden active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menyu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-3 right-3 top-16 rounded-3xl border border-border bg-card p-4 shadow-2xl lg:hidden animate-fade-up">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-5 py-3 text-base font-semibold transition ${
                    isActive
                      ? "bg-background text-lolazor-sky border border-border/60"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/links"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center rounded-2xl bg-[#F59E0B] px-5 py-3 text-center text-base font-bold text-black shadow-md transition active:scale-[0.98]"
            >
              Havolalar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}