"use client";

import { Star, ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface CourseCardProps {
  title: string;
  description: string;
  rating: number;
  image: string;
  tag?: string;
  batch?: string;
  className?: string;
  url?: string;
  style?: React.CSSProperties;
}

export function CourseCard({
  title,
  description,
  rating,
  image,
  tag,
  batch,
  className,
  url,
  style
}: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={style}
      className={cn(
        "group relative flex flex-col bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500",
        className
      )}
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-video min-h-[200px] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {tag && (
            <div className="bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg border border-white/20">
              {tag}
            </div>
          )}
          {batch && (
            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-neutral-100 shadow-lg border border-neutral-200/50 dark:border-neutral-700/50">
              {batch}
            </div>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-amber-400/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-lg border border-amber-300/30">
          <Star className="h-3 w-3 fill-white text-white" />
          <span className="text-[11px] font-black text-white">{rating}</span>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
           <div className="h-14 w-14 rounded-full bg-blue-600/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">
              <PlayCircle className="h-8 w-8" />
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 font-medium leading-relaxed mb-8 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between gap-4 pt-2">
          <Link href={url || "#"} className="flex-1">
            <Button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest h-12 transition-all active:scale-95 shadow-xl shadow-blue-500/20 border-0 cursor-pointer">
              Enroll Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <button className="h-12 px-4 rounded-xl text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all font-bold text-xs uppercase tracking-widest whitespace-nowrap">
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
