import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Code2,
  Database,
  GitBranch,
  Layers,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import { SKILL_CATEGORIES, type SkillCategory } from '../constants'
import Reveal, { SectionHeading } from '../components/ui'
import { cn } from '../utils'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  programming: Terminal,
  ai: Brain,
  frontend: Layers,
  backend: Database,
  tools: GitBranch,
}

const SKILL_TOOLTIPS: Record<string, string> = {
  python: 'Primary language for ML, data pipelines, and backend services',
  javascript: 'Dynamic web apps, Node.js APIs, and interactive UIs',
  typescript: 'Type-safe React/Next.js and production-grade frontends',
  sql: 'Analytics queries, feature engineering, and BI pipelines',
  langgraph: 'Multi-agent orchestration with stateful LangGraph graphs',
  langchain: 'LLM chains, RAG pipelines, and tool-calling agents',
  react: 'Component-driven UIs with hooks and modern patterns',
  fastapi: 'High-performance async Python APIs for AI services',
  docker: 'Containerized deployments for AI and web apps',
  git: 'Version control, branching, and collaborative workflows',
}

function getTooltip(skillName: string, category: SkillCategory): string {
  const key = skillName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const iconKey = SKILL_CATEGORIES.flatMap((c) => c.skills).find(
    (s) => s.name === skillName,
  )?.icon
  return (
    SKILL_TOOLTIPS[key] ??
    SKILL_TOOLTIPS[iconKey ?? ''] ??
    `${skillName} — ${category.title} proficiency`
  )
}

function SkillCard({
  name,
  level,
  category,
}: {
  name: string
  level: number
  category: SkillCategory
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        rotateX: 4,
        rotateY: -4,
        transition: { duration: 0.25 },
      }}
      className="group glow-border glass perspective-[800px] rounded-xl p-4 transition-shadow hover:shadow-[0_0_32px_rgba(0,229,255,0.18)]"
      title={getTooltip(name, category)}
      aria-label={`${name}, ${level}% proficiency`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <Code2 size={16} aria-hidden />
          </span>
          <h3 className="text-sm font-semibold text-white">{name}</h3>
        </div>
        <span className="text-xs font-medium text-primary tabular-nums">{level}%</span>
      </div>

      <div
        className="h-1.5 overflow-hidden rounded-full bg-white/5"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
    </motion.article>
  )
}

export default function Skills() {
  const [activeId, setActiveId] = useState(SKILL_CATEGORIES[0].id)
  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === activeId) ?? SKILL_CATEGORIES[0]

  return (
    <section
      id="skills"
      className="section-pad section-y relative bg-card/30"
      aria-labelledby="skills-heading"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I ship with"
          subtitle={
            <>
              From <strong>agent orchestration</strong> to <strong>full-stack delivery</strong> — depth
              where it counts.
            </>
          }
        />

        <Reveal>
          <div
            className="mb-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Skill categories"
          >
            {SKILL_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] ?? Code2
              const isActive = cat.id === activeId
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setActiveId(cat.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white shadow-[0_0_24px_rgba(0,229,255,0.15)]'
                      : 'glass text-muted hover:text-white',
                  )}
                  data-cursor="hover"
                >
                  <Icon size={16} aria-hidden />
                  {cat.title}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div
          id={`panel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory.id}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {activeCategory.skills.map((skill, i) => (
                <Reveal key={skill.name} delay={i * 0.04}>
                  <SkillCard name={skill.name} level={skill.level} category={activeCategory} />
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
