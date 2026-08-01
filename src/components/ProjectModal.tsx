import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Layers, AlertTriangle, Lightbulb } from 'lucide-react'
import type { Project } from '../constants'
import { MagneticButton } from './ui'
import { cn } from '../utils'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!project) return

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [project, handleEscape])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close project details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className={cn(
              'glass-strong glow-border relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl',
              'shadow-[0_0_60px_rgba(0,229,255,0.12)]',
            )}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={cn(
                'relative h-36 shrink-0 overflow-hidden bg-gradient-to-br sm:h-44',
                project.gradient,
              )}
            >
              <img
                src={project.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
                aria-hidden
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full glass text-white transition-colors hover:text-primary"
                aria-label="Close"
                data-cursor="hover"
              >
                <X size={18} />
              </button>
            </div>

            <div className="hide-scrollbar overflow-y-auto p-6 sm:p-8">
              <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-primary uppercase">
                Case Study
              </p>
              <h2 id="project-modal-title" className="font-display text-2xl font-bold text-white sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-5">
                <section aria-labelledby="architecture-heading">
                  <h3
                    id="architecture-heading"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    <Layers size={16} className="text-primary" aria-hidden />
                    Architecture
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{project.architecture}</p>
                </section>

                <section aria-labelledby="challenges-heading">
                  <h3
                    id="challenges-heading"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    <AlertTriangle size={16} className="text-secondary" aria-hidden />
                    Challenges
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted" role="list">
                    {project.challenges.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-secondary" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="learnings-heading">
                  <h3
                    id="learnings-heading"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    <Lightbulb size={16} className="text-accent" aria-hidden />
                    Key Learnings
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted" role="list">
                    {project.learnings.map((l) => (
                      <li key={l} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        {l}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/5 pt-6">
                {project.demo && (
                  <MagneticButton href={project.demo} variant="primary" external ariaLabel="Live demo">
                    <ExternalLink size={16} aria-hidden />
                    Live Demo
                  </MagneticButton>
                )}
                {project.github && (
                  <MagneticButton href={project.github} variant="secondary" external ariaLabel="View on GitHub">
                    <Github size={16} aria-hidden />
                    GitHub
                  </MagneticButton>
                )}
                <MagneticButton variant="ghost" onClick={onClose} ariaLabel="Close modal">
                  Close
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
