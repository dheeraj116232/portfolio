import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { EXPERIENCES } from '../constants'
import Reveal, { SectionHeading } from '../components/ui'
import { cn } from '../utils'

const TYPE_STYLES: Record<string, string> = {
  Internship: 'text-primary border-primary/30 bg-primary/10',
  Leadership: 'text-secondary border-secondary/30 bg-secondary/10',
  Project: 'text-accent border-accent/30 bg-accent/10',
}

/** Wrap key metrics (numbers, %, time savings) in the About-style gradient */
function renderBullet(bullet: string) {
  // Split on metrics like "10+", "under 5 minutes", "~25%", "~30%", "~40%", "92%", "7+"
  const parts = bullet.split(
    /(10\+|under 5 minutes|~25%|~30%|~40%|92%|7\+|1\+ day)/g,
  )
  return parts.map((part, i) =>
    /^(10\+|under 5 minutes|~25%|~30%|~40%|92%|7\+|1\+ day)$/.test(part) ? (
      <strong key={i}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-pad section-y relative bg-card/20"
      aria-labelledby="experience-heading"
    >
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I have built"
          subtitle="Internships, leadership, and hands-on delivery across AI, data, and web."
        />

        <div className="relative">
          <div
            className="absolute top-0 left-[11px] h-full w-px bg-gradient-to-b from-primary/60 via-secondary/30 to-transparent md:left-1/2 md:-translate-x-px"
            aria-hidden
          />

          <ol className="space-y-10" role="list">
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0
              return (
                <Reveal key={exp.id} delay={i * 0.08}>
                  <li className="relative md:grid md:grid-cols-2 md:gap-8">
                    <div
                      className={cn(
                        'absolute top-6 left-0 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-primary bg-bg md:left-1/2 md:-translate-x-1/2',
                      )}
                      aria-hidden
                    >
                      <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,229,255,0.8)]" />
                    </div>

                    <div className={cn('md:col-span-1', isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12')}>
                      <motion.article
                        initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="glass glow-border ml-10 rounded-2xl p-5 md:ml-0"
                      >
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              'rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase',
                              TYPE_STYLES[exp.type] ?? TYPE_STYLES.Internship,
                            )}
                          >
                            {exp.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted">
                            <Calendar size={12} aria-hidden />
                            {exp.period}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-bold">
                          <span className="gradient-text">{exp.role}</span>
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-primary">
                          <Briefcase size={14} aria-hidden />
                          {exp.company}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                          <MapPin size={12} aria-hidden />
                          {exp.location}
                        </p>

                        <ul className="mt-4 space-y-2" role="list">
                          {exp.bullets.map((bullet) => (
                            <li key={bullet.slice(0, 40)} className="flex gap-2 text-sm text-muted">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
                              {renderBullet(bullet)}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] text-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.article>
                    </div>

                    <div className="hidden md:block" aria-hidden />
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
