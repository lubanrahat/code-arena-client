# 🏟️ CodeArena

CodeArena is a cutting-edge, high-performance practice platform designed for developers to sharpen their algorithmic skills and prepare for technical interviews. Inspired by industry standards like LeetCode, CodeArena offers a premium, developer-focused experience with AI-enhanced learning tools.

![CodeArena Banner](https://res.cloudinary.com/dq4n6leek/image/upload/v1774890820/SCR-20260330-uahr_nm95cd.png)

---

## 🚀 Live Demo

- **Frontend:** [https://code-arena-client.vercel.app](https://code-arena-client.vercel.app) *(Placeholder)*
- **API Server:** [https://code-arena-server.vercel.app](https://code-arena-server.vercel.app)

---

## ✨ Key Features

- **💻 Advanced Monaco Editor**: A full-featured, responsive code editor with syntax highlighting, auto-completion, and customizable themes.
- **🧠 AI-Powered Discussions**: Integrated **Google Gemini AI** to provide instant explanations, code reviews, and optimization tips.
- **🛤️ Interactive Roadmaps**: Structured learning paths to guide you from beginner to competitive programmer.
- **🏆 Global Leaderboard**: Real-time ranking system to track your progress against a global community.
- **📊 Performance Analytics**: Visualize your problem-solving stats with interactive charts using Recharts.
- **🌑 Dark/Light Mode**: Seamlessly switch between themes for a comfortable late-night coding session.
- **🛡️ Admin Dashboard**: Comprehensive suite for managing problems, submissions, and user accounts.
- **💳 Premium Courses**: Access to exclusive learning content and structured courses.

---

## 🛠️ Technologies Used

### Core Stack
- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State/Data:**: [TanStack Query (v5)](https://tanstack.com/query/latest)
- **Form Handling**: [TanStack Form](https://tanstack.com/form/latest) & [Zod](https://zod.dev/)

### UI & UX
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler-icons.io/)
- **Feedback**: [Sonner](https://sonner.emilkowal.ski/) (Toast notifications) & [Confetti](https://github.com/catdad/canvas-confetti)

### Integration
- **Code Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- **AI**: [Google Generative AI SDK](https://ai.google.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- bun / npm / pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/lubanrahat/code-arena-client.git
cd code-arena-client
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_GMAINE_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_here
```

### 4. Run Development Server
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 🚢 Deployment

The project is optimized for [Vercel](https://vercel.com). To deploy:

1. Push your code to GitHub.
2. Link your repository to Vercel.
3. Configure the environment variables in the Vercel Dashboard.
4. Deployment happens automatically on every push!

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developed By

**Luban Rahat**
[GitHub](https://github.com/lubanrahat) | [LinkedIn](https://linkedin.com/in/lubanrahat)
