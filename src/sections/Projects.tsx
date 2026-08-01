import { useRef, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, FileText } from 'lucide-react'
import { PROJECTS, type Project } from '../constants'
import ProjectModal from '../components/ProjectModal'
import Reveal, { MagneticButton, SectionHeading } from '../components/ui'
import { cn } from '../utils'

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (p: Project) => void
}) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 18 })

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const openModal = () => onOpen(project)

  return (
    <motion.article
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        'group glow-border glass relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl',
        'transition-shadow hover:shadow-[0_0_40px_rgba(0,229,255,0.14)]',
      )}
      onClick={openModal}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openModal()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
      data-cursor="hover"
    >
      <div className={cn('relative h-44 overflow-hidden bg-gradient-to-br', project.gradient)}>
        <img
          src={project.image}
          alt=""
          className="h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          aria-hidden
        />
        {project.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-primary/20 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-primary uppercase">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold">
          <span className="gradient-text">{project.title}</span>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="rounded-md px-2 py-0.5 text-[11px] text-primary">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
          {project.demo && (
            <MagneticButton
              href={project.demo}
              variant="primary"
              external
              className="!px-4 !py-2 text-xs"
              ariaLabel={`Live demo for ${project.title}`}
            >
              <ExternalLink size={14} aria-hidden />
              Live Demo
            </MagneticButton>
          )}
          {project.github && (
            <MagneticButton
              href={project.github}
              variant="secondary"
              external
              className="!px-4 !py-2 text-xs"
              ariaLabel={`GitHub repository for ${project.title}`}
            >
              <Github size={14} aria-hidden />
              GitHub
            </MagneticButton>
          )}
          <MagneticButton
            variant="secondary"
            className="!px-4 !py-2 text-xs"
            onClick={openModal}
            ariaLabel={`Case study for ${project.title}`}
          >
            <FileText size={14} aria-hidden />
            Case Study
          </MagneticButton>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section
      id="projects"
      className="section-pad section-y relative"
      aria-labelledby="projects-heading"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          subtitle={
            <>
              <strong>AI agents</strong>, <strong>analytics platforms</strong>, and{' '}
              <strong>full-stack systems</strong> built for real users.
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06} className="h-full">
              <ProjectCard project={project} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
