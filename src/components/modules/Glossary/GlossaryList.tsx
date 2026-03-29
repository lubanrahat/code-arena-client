"use client";

import { GlossaryItem as GlossaryItemType } from "@/data/glossary-data";
import GlossaryItem from "./GlossaryItem";

interface GlossaryListProps {
  items: GlossaryItemType[];
}

export default function GlossaryList({ items }: GlossaryListProps) {
  // Group items by their starting letter
  const groupedItems = items.reduce((acc, item) => {
    const firstLetter = item.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, GlossaryItemType[]>);

  // Sort letters alphabetically
  const sortedLetters = Object.keys(groupedItems).sort();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg font-medium">
          No terms found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 pb-40">
      <div className="flex flex-col gap-20">
        {sortedLetters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-32">
            <div className="flex items-center gap-6 mb-10">
              <h2 className="text-5xl font-black text-muted/50 select-none">
                {letter}
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedItems[letter]
                .sort((a, b) => a.term.localeCompare(b.term))
                .map((item) => (
                  <GlossaryItem key={item.id} item={item} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
