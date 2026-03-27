export interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  detailed_explanation?: string;
  category: "Frontend" | "Backend" | "Fundamentals" | "Data Structures" | "Algorithms" | "Database";
  tags?: string[];
}

export const glossaryData: GlossaryItem[] = [
  {
    id: "1",
    term: "Closure",
    definition: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).",
    category: "Fundamentals",
    tags: ["JavaScript", "Functions", "Scope"],
    detailed_explanation: "In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time."
  },
  {
    id: "2",
    term: "Hoisting",
    definition: "Hoisting is JavaScript's default behavior of moving declarations to the top.",
    category: "Fundamentals",
    tags: ["JavaScript", "Scope"],
    detailed_explanation: "In JavaScript, a variable can be declared after it has been used. In other words; a variable can be used before it has been declared."
  },
  {
    id: "3",
    term: "Big O Notation",
    definition: "A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.",
    category: "Algorithms",
    tags: ["Computer Science", "Complexity"],
    detailed_explanation: "In computer science, Big O notation is used to classify algorithms according to how their run time or space requirements grow as the input size grows."
  },
  {
    id: "4",
    term: "DOM (Document Object Model)",
    definition: "A programming interface for web documents that represents the page so that programs can change the document structure, style, and content.",
    category: "Frontend",
    tags: ["Web", "HTML", "JavaScript"],
  },
  {
    id: "5",
    term: "REST API",
    definition: "An architectural style for an application program interface (API) that uses HTTP requests to access and use data.",
    category: "Backend",
    tags: ["API", "HTTP", "Web Services"],
  },
  {
    id: "6",
    term: "Binary Search",
    definition: "A search algorithm that finds the position of a target value within a sorted array.",
    category: "Algorithms",
    tags: ["Search", "Efficiency"],
  },
  {
    id: "7",
    term: "Normalization",
    definition: "The process of organizing data in a database to reduce redundancy and improve data integrity.",
    category: "Database",
    tags: ["SQL", "Design"],
  },
  {
    id: "8",
    term: "Memoization",
    definition: "An optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.",
    category: "Algorithms",
    tags: ["Optimization", "Caching"],
  },
  {
    id: "9",
    term: "Flexbox",
    definition: "A one-dimensional layout method for arranging items in rows or columns.",
    category: "Frontend",
    tags: ["CSS", "Layout"],
  },
  {
    id: "10",
    term: "Indexing",
    definition: "A data structure technique to efficiently retrieve records from the database files based on some attributes on which the indexing has been done.",
    category: "Database",
    tags: ["SQL", "Performance"],
  }
];
