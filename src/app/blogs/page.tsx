"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import blogsData from "@/data/blogs.json";
import { useState } from "react";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "DevOps", "Tutorials", "Best Practices"];

  const filteredPosts = blogsData.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Header */}
      <div className="relative border-b border-border bg-muted/30 overflow-hidden">
        <div className="relative container mx-auto px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight">
              CodeArena Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              Explore insights, tutorials, and tech trends from our platform and the official community.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-6 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 shadow-sm transition-all"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                    selectedCategory === category
                      ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:bg-muted/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blogs/${post.id}`}>
                    <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-black text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Author & Read More */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div className="text-xs">
                              <div className="font-bold text-foreground">
                                {post.author.name}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:gap-2 transition-all">
                            <span>Read</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-2">
                No posts found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 border border-border bg-card/50 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                Stay in the Loop
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get the latest articles, tutorials, and platform updates delivered to your inbox every week.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-14 px-6 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
                />
                <button className="h-14 px-8 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
