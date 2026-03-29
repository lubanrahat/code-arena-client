"use client";

import { useState } from "react";
import { roadmaps } from "@/data/roadmap-data";
import RoadmapHeader from "./RoadmapHeader";
import RoadmapCard from "./RoadmapCard";
import { motion, AnimatePresence } from "framer-motion";

export default function RoadmapListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || roadmap.difficulty === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <RoadmapHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <AnimatePresence mode="popLayout">
          {filteredRoadmaps.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredRoadmaps.map((roadmap, index) => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl text-muted-foreground">🔍</span>
              </div>
              <h3 className="text-2xl font-black text-foreground mb-2">No Roadmaps Found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                We couldn&apos;t find any roadmaps matching your search. Try a different keyword or filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
                className="mt-8 text-blue-600 dark:text-blue-500 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
