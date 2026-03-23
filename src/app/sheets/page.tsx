"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SheetCard } from "@/components/modules/Sheets/SheetCard";
import { SheetsFilters } from "@/components/modules/Sheets/SheetsFilters";
import { VisualStack } from "@/components/modules/Sheets/VisualStack";

const allSheets = [
    {
        title: "Strivers A2Z DSA Sheet",
        followers: 28151,
        questions: 455,
        description: "This course is made for people who want to learn DSA from A to Z for free in a structured way...",
        progress: 0,
    },
    {
        title: "Striver SDE Sheet",
        followers: 11256,
        questions: 191,
        description: "Striver SDE Sheet contains very handily crafted and picked top coding interview problems...",
        progress: 0,
    },
    {
        title: "Love Babbar Sheet",
        followers: 6916,
        questions: 430,
        description: "The DSA sheet by Love Babbar is designed to cover almost every concept in Data Structures and Algorithms...",
        progress: 0,
    },
    {
        title: "Neetcode 150",
        followers: 4511,
        questions: 150,
        description: "The Neetcode 150 sheet, curated by Navdeep Singh, is a popular and beginner-friendly sheet for interview prep...",
        progress: 0,
    },
    {
        title: "Top Interview 150: Leetcode",
        followers: 4150,
        questions: 150,
        description: "The Top 150 sheet, curated by LeetCode, features the most frequently asked interview questions on LeetCode...",
        progress: 0,
    },
    {
        title: "Blind 75",
        followers: 3492,
        questions: 75,
        description: "The Blind 75 sheet includes a curated list of 75 frequently asked LeetCode questions for quick revision...",
        progress: 0,
    },
];

export default function SheetsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-20 pb-20 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

            <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            Empower Your Logic
                        </motion.div>

                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-neutral-950 dark:text-white leading-[0.9]">
                                Track Coding Sheets
                                <br />
                                <span className="text-orange-500">In One Place</span>
                            </h1>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium max-w-xl">
                                Choose from 30+ structured coding paths designed by top experts to help you ace your next interview.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative max-w-md mx-auto lg:mx-0 pt-4">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 z-10" />
                            <Input
                                type="text"
                                placeholder="Search any coding sheet..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-14 pl-6 pr-12 rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl shadow-neutral-200/50 dark:shadow-none font-medium"
                            />
                        </div>
                    </div>

                    {/* Modern 3D Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="hidden lg:block flex-1 max-w-xl"
                    >
                        <VisualStack />
                    </motion.div>
                </div>

                {/* Filters Section */}
                <div className="space-y-8 mb-16">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight">
                            All Sheets
                        </h2>
                    </div>
                    <SheetsFilters
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                </div>

                {/* Sheets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allSheets
                        .filter((sheet) =>
                            sheet.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((sheet, index) => (
                            <SheetCard key={index} {...sheet} />
                        ))}
                </div>

                {/* Show More */}
                <div className="mt-16 text-center">
                    <button className="text-sm font-black text-neutral-500 hover:text-orange-500 uppercase tracking-widest transition-colors">
                        Show More
                    </button>
                </div>
            </main>
        </div>
    );
}