export interface Project {
  id: string
  title: string
  shortDescription: string
  description: string
  image: string
  gradient: string
  tech: string[]
  features: string[]
  architecture: string
  challenges: string[]
  learnings: string[]
  github?: string
  demo?: string
  caseStudy?: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'ai-codebase-knowledge',
    title: 'AI Codebase Knowledge Platform',
    shortDescription:
      'AI codebase intelligence with semantic search, repository Q&A, AST analysis, docs, PR reviews, and architecture maps.',
    description:
      'AI-powered codebase intelligence platform that enables semantic code search, repository Q&A, AST analysis, dependency graphs, automated documentation, PR reviews, and architecture visualization using RAG, LangGraph, and Groq.',
    image: '/projects/ai-codebase.svg',
    gradient: 'from-emerald-500/25 via-cyan-500/15 to-violet-500/10',
    tech: ['RAG', 'LangGraph', 'Groq', 'AST Analysis', 'Vector Search', 'Next.js', 'Vercel'],
    features: [
      'Semantic code search across repositories',
      'Repository Q&A grounded in retrieved code context',
      'AST analysis with dependency graph mapping',
      'Automated documentation and PR review workflows',
      'Architecture visualization for faster system understanding',
    ],
    architecture:
      'Repository URL/import -> ingestion and AST parser -> code chunking, embeddings, and dependency graph -> LangGraph RAG workflow -> Groq-powered answers, docs, PR review feedback, and architecture visualizations in the web UI.',
    challenges: [
      'Combining semantic retrieval with structural AST signals',
      'Grounding codebase answers to reduce hallucinated implementation details',
      'Keeping generated docs and architecture views aligned with repository changes',
    ],
    learnings: [
      'Designing RAG systems for source-code understanding',
      'Orchestrating code intelligence workflows with LangGraph',
      'Using graph context to make AI developer tools more explainable',
    ],
    github: 'https://github.com/dheeraj116232/ai-codebase-knowledge-platform',
    demo: 'https://ai-codebase-knowledge-platform.vercel.app/',
    featured: true,
  },
  {
    id: 'bi-platform',
    title: 'AI Business Intelligence Platform',
    shortDescription:
      'Enterprise BI powered by 5 LangGraph agents: clean, analyze, chart, forecast, and report in under 30 seconds.',
    description:
      'Upload CSV/Excel data and receive automatic cleaning, analytics, 10 charts, ML forecasting, and a CEO-ready PDF report. Built as a sequential LangGraph state machine with FastAPI + Next.js.',
    image: '/projects/bi-platform.svg',
    gradient: 'from-cyan-500/30 via-violet-500/20 to-transparent',
    tech: ['LangGraph', 'FastAPI', 'Next.js', 'PostgreSQL', 'XGBoost', 'Prophet', 'Groq'],
    features: [
      '5-agent pipeline: clean -> analyze -> visualize -> forecast -> report',
      '10+ auto-generated Matplotlib charts',
      '4-model forecast ensemble with MAPE selection',
      'CEO-ready multi-page PDF via ReportLab',
      'Async job queue with live per-agent progress',
    ],
    architecture:
      'User upload -> FastAPI /api/analyze -> LangGraph StateGraph (5 agents) -> Neon PostgreSQL job history -> Next.js dashboard with KPI cards, charts, and PDF download.',
    challenges: [
      'Chart rendering on serverless without headless Chrome; rebuilt on Matplotlib Agg',
      'Forecast reliability on small datasets with a 4-model ensemble and holdout MAPE',
      'Long-running pipeline vs HTTP timeouts; async job queue plus polling',
    ],
    learnings: [
      'Production agent orchestration with error isolation per node',
      'Designing shared AgentState TypedDicts for multi-agent pipelines',
      'Splitting frontend/backend deployments with CORS and progress UX',
    ],
    github: 'https://github.com/dheeraj116232/multi-agent-bi-platform',
    demo: 'https://multi-agent-bi-platform.vercel.app/',
    featured: true,
  },
  {
    id: 'travel-ai',
    title: 'Multi-Agent Travel AI',
    shortDescription:
      'LangGraph travel planner that searches flights, hotels, builds itineraries, and generates trip summaries.',
    description:
      'Natural-language travel requests become complete plans via a sequential agent pipeline: Flight -> Hotel -> Itinerary -> Summary, powered by Llama 3.3 70B via Groq.',
    image: '/projects/travel-ai.svg',
    gradient: 'from-violet-500/30 via-cyan-500/20 to-transparent',
    tech: ['LangGraph', 'LangChain', 'Streamlit', 'Groq', 'Docker', 'PostgreSQL'],
    features: [
      'Live flight data via AviationStack',
      'Hotel/travel context via Tavily search',
      'Stateful LangGraph checkpointing',
      'Markdown/PDF export of trip plans',
      'Dockerized deployment on Render',
    ],
    architecture:
      'Streamlit UI -> LangGraph sequential agents (Flight, Hotel, Itinerary, Summary) -> Groq LLM + external APIs -> PostgreSQL checkpoints & trip history.',
    challenges: [
      'Coordinating multi-API reliability with graceful fallbacks',
      'Rate limiting per session to control LLM costs',
      'Optional persistence without blocking local demos',
    ],
    learnings: [
      'Building user-facing agent products with Streamlit',
      'Checkpointing multi-step agent workflows',
      'Containerizing AI apps for free-tier hosting',
    ],
    github: 'https://github.com/dheeraj116232/multi-agent-travel-ai',
    demo: 'https://tripnavigator-ai.onrender.com/',
    featured: true,
  },
  {
    id: 'blog-agent',
    title: 'AI Blog Agent System',
    shortDescription:
      'Plan, research, write, and image-generation pipeline with multi-provider LLM and export support.',
    description:
      'LangGraph blog agent that plans topics, researches with Tavily, writes long-form content, generates images, and exports Markdown/PDF/ZIP with multi-provider LLM support.',
    image: '/projects/blog-agent.svg',
    gradient: 'from-pink-500/25 via-violet-500/15 to-transparent',
    tech: ['LangGraph', 'Streamlit', 'AWS Bedrock', 'Tavily', 'Pydantic'],
    features: [
      'Plan -> research -> write -> image pipeline',
      'Claude / Grok / Gemini providers',
      'Markdown, PDF, ZIP export',
      'Pydantic-validated agent outputs',
      'Deployed on Render',
    ],
    architecture:
      'Streamlit UI -> LangGraph nodes (plan, research, write, image) -> multi-provider LLMs -> export artifacts.',
    challenges: [
      'Keeping long-form tone consistent across agents',
      'Handling provider rate limits',
      'Validating structured outputs reliably',
    ],
    learnings: [
      'Composable content agent graphs',
      'Provider abstraction for LLMs',
      'Shipping agent products users can export from',
    ],
    github: 'https://github.com/dheeraj116232/Ai-agent-blog-system',
    demo: 'https://ai-agent-blog-system.onrender.com/',
    featured: true,
  },
  {
    id: 'portfolio',
    title: '3D Portfolio Website',
    shortDescription:
      'Cinematic dark futuristic portfolio with R3F scenes, Framer Motion, and Lenis smooth scroll.',
    description:
      'This site is a performance-focused React 19 + Vite portfolio with immersive Three.js backgrounds, glassmorphism UI, and accessibility-first interactions.',
    image: '/projects/portfolio.svg',
    gradient: 'from-cyan-500/30 via-blue-600/20 to-transparent',
    tech: ['React 19', 'Vite', 'R3F', 'Framer Motion', 'Tailwind', 'Lenis'],
    features: [
      'Immersive React Three Fiber hero',
      'Custom cursor + magnetic CTAs',
      'Lazy-loaded 3D & code-split sections',
      'SEO + structured data',
      'Fully responsive & accessible',
    ],
    architecture:
      'Vite SPA -> lazy sections -> R3F Canvas (dpr capped) -> Framer Motion scroll reveals -> EmailJS contact.',
    challenges: [
      'Keeping 3D FPS high on mobile',
      'Balancing cinematic motion with a11y reduced-motion',
      'Lighthouse-friendly lazy loading',
    ],
    learnings: [
      'Production patterns for R3F portfolios',
      'Motion systems that feel premium without lag',
      'Design systems around glass + glow tokens',
    ],
    github: 'https://github.com/dheeraj116232/portfolio',
    demo: '#home',
  },
  {
    id: 'rag-chatbot',
    title: 'RAG Chatbot',
    shortDescription:
      'Retrieval-Augmented Generation chatbot with LangChain, MongoDB, and LLMs for grounded answers.',
    description:
      'Built during Data Science internship to accelerate analysis. Documents are chunked, embedded, and retrieved so the LLM answers from verified context, cutting analysis time by ~40%.',
    image: '/projects/rag.svg',
    gradient: 'from-cyan-400/25 via-blue-500/15 to-transparent',
    tech: ['LangChain', 'MongoDB', 'TypeScript', 'LLMs', 'Embeddings'],
    features: [
      'Document ingestion & chunking',
      'Vector retrieval over knowledge base',
      'Grounded LLM responses',
      'MongoDB persistence',
      '~40% faster analysis workflows',
    ],
    architecture:
      'Documents -> chunking/embeddings -> MongoDB vector store -> retrieval -> LLM generation with cited context.',
    challenges: [
      'Balancing chunk size vs retrieval quality',
      'Reducing hallucinations with strict context windows',
      'Latency under interactive usage',
    ],
    learnings: [
      'End-to-end RAG pipeline design',
      'When retrieval beats fine-tuning',
      'Evaluation loops for grounded answers',
    ],
    github: 'https://github.com/dheeraj116232/RAG-ChatBoat',
  },
]
