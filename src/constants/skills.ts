export interface SkillItem {
  name: string
  level: number
  icon: string
}

export interface SkillCategory {
  id: string
  title: string
  skills: SkillItem[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    skills: [
      { name: 'Python', level: 95, icon: 'python' },
      { name: 'JavaScript', level: 88, icon: 'javascript' },
      { name: 'TypeScript', level: 85, icon: 'typescript' },
      { name: 'SQL', level: 86, icon: 'sql' },
      { name: 'C++', level: 100, icon: 'cpp' },
    ],
  },
  {
    id: 'ai',
    title: 'AI / ML',
    skills: [
      { name: 'LangGraph', level: 95, icon: 'ai' },
      { name: 'LangChain', level: 92, icon: 'ai' },
      { name: 'TensorFlow', level: 80, icon: 'tensorflow' },
      { name: 'PyTorch', level: 78, icon: 'pytorch' },
      { name: 'Scikit-learn', level: 90, icon: 'sklearn' },
      { name: 'OpenAI / LLMs', level: 90, icon: 'openai' },
      { name: 'Pandas', level: 92, icon: 'pandas' },
      { name: 'NumPy', level: 90, icon: 'numpy' },
      { name: 'Matplotlib', level: 85, icon: 'chart' },
      { name: 'Power BI', level: 82, icon: 'powerbi' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', level: 88, icon: 'react' },
      { name: 'Next.js', level: 85, icon: 'nextjs' },
      { name: 'Tailwind CSS', level: 90, icon: 'tailwind' },
      { name: 'HTML', level: 95, icon: 'html' },
      { name: 'CSS', level: 90, icon: 'css' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'FastAPI', level: 92, icon: 'fastapi' },
      { name: 'Node.js', level: 85, icon: 'node' },
      { name: 'Express', level: 82, icon: 'express' },
      { name: 'MongoDB', level: 80, icon: 'mongo' },
      { name: 'PostgreSQL', level: 88, icon: 'postgres' },
      { name: 'Prisma', level: 75, icon: 'prisma' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Git', level: 90, icon: 'git' },
      { name: 'GitHub', level: 92, icon: 'github' },
      { name: 'Docker', level: 80, icon: 'docker' },
      { name: 'Linux', level: 82, icon: 'linux' },
      { name: 'VS Code', level: 95, icon: 'vscode' },
    ],
  },
]
