"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, User, MapPin, Menu, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Timeout helps prevent React strict mode hydration mismatch from synchronous state sets in useEffect
    const timeout = setTimeout(() => setMounted(true), 10);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Sarees", href: "#" },
    { name: "Suits", href: "#" },
    { name: "Lehengas", href: "#" },
    { name: "Coord Sets", href: "#" },
    { name: "Wedding", href: "#" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Mobile Menu Button & Search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-gray-800" />
            </button>
            <Search className="w-5 h-5 text-gray-500" />
          </div>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center justify-center flex-1 lg:flex-none lg:justify-start">
             <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-serif font-bold text-amber-700 tracking-wider">Rang Utsav</span>
                <span className="text-[10px] md:text-xs tracking-[0.2em] text-gray-500 font-medium">DESIGNER</span>
             </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-800 hover:text-amber-600 transition-colors uppercase tracking-wide flex items-center gap-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden xl:flex relative w-64 group">
              <Input
                type="text"
                placeholder="Search premium collections..."
                className="pl-10 pr-4 py-2 rounded-full border-gray-200 bg-gray-50 focus:bg-white transition-all w-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-amber-600" />
            </div>

            <div className="flex items-center gap-3">
              <Link href="#" className="text-gray-700 hover:text-amber-600 hidden md:block">
                <User className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-700 hover:text-amber-600 hidden sm:block relative">
                <Heart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0 flex items-center justify-center bg-amber-600 text-[10px]">0</Badge>
              </Link>
              <Link href="#" className="text-gray-700 hover:text-amber-600 relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0 flex items-center justify-center bg-amber-600 text-[10px]">2</Badge>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Pincode & Info Bar (Only visible when not scrolled) */}
        <AnimatePresence>
          {mounted && !isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="hidden lg:flex items-center justify-between pt-4 mt-4 border-t border-gray-100 text-xs text-gray-500"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>Deliver to:</span>
                <button className="font-medium text-amber-700 hover:underline">Check Pincode</button>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 hover:text-amber-700">English <ChevronDown className="w-3 h-3"/></button>
                <button className="flex items-center gap-1 hover:text-amber-700">INR (₹) <ChevronDown className="w-3 h-3"/></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-white z-50 shadow-xl overflow-y-auto"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <span className="font-serif font-bold text-amber-700">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
