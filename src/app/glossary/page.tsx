"use client";

import { useState, useMemo } from "react";
import { glossaryData } from "@/data/glossary-data";
import GlossaryHeader from "@/components/modules/Glossary/GlossaryHeader";
import GlossaryList from "@/components/modules/Glossary/GlossaryList";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    return glossaryData.filter((item) => {
      const matchesSearch = 
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="min-h-screen bg-background">
      <GlossaryHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <GlossaryList items={filteredItems} />
    </main>
  );
}