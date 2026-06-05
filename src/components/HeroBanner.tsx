"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden bg-stone-900 mt-[70px] lg:mt-0">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero_boutique.png"
          alt="Premium Boutique Collection"
          fill
          priority
          className="object-cover object-center opacity-70"
          sizes="100vw"
        />
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-2xl text-white pt-20 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 mb-6 border border-amber-500/50 rounded-full text-xs uppercase tracking-[0.3em] font-medium text-amber-400 bg-amber-500/10 backdrop-blur-sm">
              New Arrival 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-6 drop-shadow-lg"
          >
            Handcrafted <br />
            <span className="text-amber-500 italic font-light">Elegance</span> in <br />
            Every Weave
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-stone-200 mb-10 max-w-lg font-light leading-relaxed drop-shadow-md"
          >
            Discover our premium collection of designer suits, royal saris, and heavy bridal lehengas. Experience the luxury of Indian heritage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-none px-8 py-6 text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105"
            >
              Shop Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-black hover:bg-white/10 hover:text-white rounded-none px-8 py-6 text-sm uppercase tracking-widest font-semibold backdrop-blur-sm transition-all"
            >
              View Lookbook
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/70 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
