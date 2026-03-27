export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  link?: string;
  type?: 'video' | 'article' | 'project' | 'exercise';
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
  steps: RoadmapStep[];
}

export const roadmaps: Roadmap[] = [
  {
    id: 'frontend-development',
    title: 'Frontend Development Roadmap',
    description: 'Master HTML, CSS, JavaScript, and frameworks like React to build modern web apps.',
    author: 'Shreyansh',
    date: 'May 1st, 2025',
    difficulty: 'Beginner',
    category: 'Web Development',
    image: 'https://img.freepik.com/free-vector/frontend-developer-concept-professional-software-engineering-programming-interface-design-optimization-illustration-isometric-style_1284-63384.jpg',
    steps: [
      { id: '1', title: 'HTML & CSS Basics', description: 'Learn the core building blocks of the web.' },
      { id: '2', title: 'JavaScript Essentials', description: 'Master ES6+, DOM manipulation, and Calc.' },
      { id: '3', title: 'React Fundamentals', description: 'Hooks, Props, State, and Component life cycle.' },
      { id: '4', title: 'State Management', description: 'Redux Toolkit, Zustand, or Context API.' },
      { id: '5', title: 'Next.js & Performance', description: 'SSR, ISR, and App Router optimization.' },
    ]
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Learn arrays, linked lists, trees, and algorithms to ace coding interviews.',
    author: 'LeetLabs Team',
    date: 'April 30th, 2025',
    difficulty: 'Intermediate',
    category: 'Computer Science',
    image: 'https://img.freepik.com/free-vector/algorithm-concept-illustration_114360-10118.jpg',
    steps: [
      { id: '1', title: 'Time & Space Complexity', description: 'Understand Big O notation.' },
      { id: '2', title: 'Arrays & Hashing', description: 'Fast lookups and sorting basics.' },
      { id: '3', title: 'Trees & Graphs', description: 'Traversal and shortest path algorithms.' },
      { id: '4', title: 'Dynamic Programming', description: 'Recursion with memoization.' },
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Roadmap',
    description: 'Dive into Python, NumPy, and TensorFlow to build intelligent systems.',
    author: 'Shreyansh',
    date: 'March 20th, 2025',
    difficulty: 'Advanced',
    category: 'AI & Data Science',
    image: 'https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-700.jpg',
    steps: [
      { id: '1', title: 'Python for Data Science', description: 'NumPy, Pandas, and Matplotlib.' },
      { id: '2', title: 'Supervised Learning', description: 'Regression, Classification, and SVMs.' },
      { id: '3', title: 'Neural Networks', description: 'Deep Learning with TensorFlow/PyTorch.' },
    ]
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    description: 'Learn Node.js, Express, and databases to create robust server-side applications.',
    author: 'Shreyansh',
    date: 'May 10th, 2025',
    difficulty: 'Intermediate',
    category: 'Web Development',
    image: 'https://img.freepik.com/free-vector/backend-developer-concept-professional-software-engineering-server-side-programming-illustration-isometric-style_1284-63385.jpg',
    steps: [
      { id: '1', title: 'Node.js Internals', description: 'Event loop, fs module, and streams.' },
      { id: '2', title: 'Database Design', description: 'PostgreSQL, MongoDB, and normalization.' },
      { id: '3', title: 'System Architecture', description: 'Microservices, Caching, and Load Balancers.' },
    ]
  },
  {
    id: 'mobile-app-dev',
    title: 'Mobile App Development',
    description: 'Build cross-platform apps using Flutter or React Native for iOS and Android.',
    author: 'Hitesh',
    date: 'April 1st, 2025',
    difficulty: 'Advanced',
    category: 'Mobile Development',
    image: 'https://img.freepik.com/free-vector/mobile-app-development-concept-illustration_114360-5110.jpg',
    steps: [
      { id: '1', title: 'Dart Fundamentals', description: 'Object oriented programming with Dart.' },
      { id: '2', title: 'Flutter Widgets', description: 'State management and navigation.' },
      { id: '3', title: 'App Store Deployment', description: 'Building and publishing to Play Store.' },
    ]
  },
  {
    id: 'competitive-programming',
    title: 'Competitive Programming',
    description: 'Sharpen your problem-solving skills with advanced algorithms and CodeArena challenges.',
    author: 'LeetLabs Team',
    date: 'May 15th, 2025',
    difficulty: 'Advanced',
    category: 'Computer Science',
    image: 'https://img.freepik.com/free-vector/coding-concept-illustration_114360-930.jpg',
    steps: [
      { id: '1', title: 'Math for CP', description: 'Number theory and combinatorics.' },
      { id: '2', title: 'Advanced Graphs', description: 'Max flow, min cut, and segment trees.' },
      { id: '3', title: 'Problem Solving Strategies', description: 'Divide and conquer, greedy algorithms.' },
    ]
  }
];
