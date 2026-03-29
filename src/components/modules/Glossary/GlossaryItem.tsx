"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Tag } from "lucide-react";
import { GlossaryItem as GlossaryItemType } from "@/data/glossary-data";

interface GlossaryItemProps {
  item: GlossaryItemType;
}

export default function GlossaryItem({ item }: GlossaryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative group bg-card text-card-foreground backdrop-blur-xl border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl ${
        isExpanded ? "ring-2 ring-blue-500/20 shadow-sm" : ""
      }`}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider border border-border">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors">
                {item.term}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.definition}
            </p>
          </div>
          <button className="mt-1 p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 group-hover:text-blue-500 transition-all">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-border">
                {item.detailed_explanation && (
                  <div className="mb-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
                      Deep Dive
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed font-medium">
                      {item.detailed_explanation}
                    </p>
                  </div>
                )}
                
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <div 
                        key={tag}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-[10px] font-bold border border-border"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative gradient on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
