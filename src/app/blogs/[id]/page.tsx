"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Twitter, Linkedin, Facebook, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import blogsData from "@/data/blogs.json";

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id as string;
  const post = blogsData.find((blog) => blog.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <Link
            href="/blogs"
            className="text-indigo-500 hover:text-indigo-600 font-bold"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-950 relative overflow-x-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 80%)",
        }}
      />

      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-zinc-950 via-white/60 dark:via-zinc-950/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 -mt-32">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-zinc-200 dark:border-zinc-800 mb-8"
          >
            {/* Category Badge */}
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-zinc-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              {post.subtitle}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {post.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
                Share:
              </span>
              <button className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors">
                <LinkIcon className="w-4 h-4" />
              </button>
              <div className="flex-1" />
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                <Bookmark className="w-4 h-4" />
                <span className="text-sm font-bold">Save</span>
              </button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <BlogContent content={post.content} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-linear-to-br from-indigo-500/10 to-violet-500/10 rounded-3xl p-8 border border-indigo-500/20 mb-12"
          >
            <div className="flex items-start gap-6">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={80}
                height={80}
                className="rounded-2xl"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
                  About {post.author.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {post.author.bio}
                </p>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  {post.author.role}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related Articles CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-6">
              Want to read more?
            </h3>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/30"
            >
              Explore All Articles
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Component to render markdown-like content
function BlogContent({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  const elements: JSX.Element[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = "";

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      elements.push(
        <p key={elements.length} className="mb-6 leading-relaxed">
          {currentParagraph.join(" ")}
        </p>
      );
      currentParagraph = [];
    }
  };

  lines.forEach((line, index) => {
    // Code block detection
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        flushParagraph();
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
        codeBlockContent = [];
      } else {
        elements.push(
          <pre
            key={elements.length}
            className="mb-6 p-6 rounded-2xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 overflow-x-auto"
          >
            <code className="text-sm text-zinc-100 font-mono">
              {codeBlockContent.join("\n")}
            </code>
          </pre>
        );
        inCodeBlock = false;
        codeBlockContent = [];
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Headers
    if (line.startsWith("## ")) {
      flushParagraph();
      elements.push(
        <h2
          key={elements.length}
          className="text-3xl font-black text-zinc-900 dark:text-white mt-12 mb-6"
        >
          {line.slice(3)}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      elements.push(
        <h3
          key={elements.length}
          className="text-2xl font-black text-zinc-900 dark:text-white mt-8 mb-4"
        >
          {line.slice(4)}
        </h3>
      );
      return;
    }

    // List items
    if (line.startsWith("- ")) {
      flushParagraph();
      elements.push(
        <li key={elements.length} className="mb-2 ml-6 list-disc">
          {line.slice(2)}
        </li>
      );
      return;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      flushParagraph();
      elements.push(
        <hr
          key={elements.length}
          className="my-12 border-zinc-200 dark:border-zinc-800"
        />
      );
      return;
    }

    // Empty line
    if (line.trim() === "") {
      flushParagraph();
      return;
    }

    // Regular text
    currentParagraph.push(line);
  });

  flushParagraph();

  return <>{elements}</>;
}
