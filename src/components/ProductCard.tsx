"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  isNew?: boolean;
  isTrending?: boolean;
}

export default function ProductCard({
  id,
  title,
  category,
  price,
  originalPrice,
  image,
  rating = 4.5,
  isNew,
  isTrending
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div
      className="group relative flex flex-col bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <Link href={`/product/${id}`} className="relative w-full h-full block">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {isNew && (
            <Badge className="bg-white text-black hover:bg-white rounded-none border-none text-[10px] font-bold uppercase tracking-wider px-2 py-1 shadow-sm">
              New
            </Badge>
          )}
          {isTrending && (
            <Badge className="bg-amber-600 text-white hover:bg-amber-600 rounded-none border-none text-[10px] font-bold uppercase tracking-wider px-2 py-1 shadow-sm">
              Trending
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-red-600 text-white hover:bg-red-600 rounded-none border-none text-[10px] font-bold uppercase tracking-wider px-2 py-1 shadow-sm">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Hover Actions */}
        <div
          className={`absolute bottom-0 left-0 w-full p-4 flex justify-center gap-3 transition-all duration-300 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } bg-gradient-to-t from-black/60 to-transparent`}
        >
          <button className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors shadow-md group/btn tooltip-trigger" aria-label="Add to Wishlist">
             <Heart className="w-4 h-4" />
          </button>
          <button className="flex-1 max-w-[160px] h-10 rounded-full bg-amber-600 text-white flex items-center justify-center gap-2 hover:bg-amber-700 transition-colors shadow-md text-sm font-medium">
             <ShoppingBag className="w-4 h-4" />
             Add to Cart
          </button>
          <button className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors shadow-md" aria-label="Quick View">
             <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="py-4 px-2 flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
           <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{category}</p>
           <div className="flex items-center gap-1">
             <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
             <span className="text-[10px] text-gray-600 font-medium">{rating}</span>
           </div>
        </div>

        <Link href={`/product/${id}`}>
          <h3 className="text-sm md:text-base font-serif font-medium text-gray-900 line-clamp-1 hover:text-amber-700 transition-colors">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-gray-900">₹{price.toLocaleString('en-IN')}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
