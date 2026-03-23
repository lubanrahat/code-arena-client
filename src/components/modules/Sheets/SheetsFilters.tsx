import { cn } from "@/lib/utils";

const categories = [
  "Company Wise",
  "All",
  "Popular",
  "Quick Revision",
  "Complete DSA",
  "Topic Specific",
  "Competitive",
];

interface SheetsFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function SheetsFilters({
  activeCategory,
  onCategoryChange,
}: SheetsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group overflow-hidden",
            activeCategory === category
              ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20"
              : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500/50 shadow-sm"
          )}
        >
          <span className="relative z-10">{category}</span>
          {activeCategory !== category && (
            <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-5 transition-opacity" />
          )}
        </button>
      ))}
    </div>
  );
}
