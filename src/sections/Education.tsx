import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react'
import { EDUCATION } from '../constants'
import Reveal, { SectionHeading } from '../components/ui'
import { cn } from '../utils'

export default function Education() {
  return (
    <section
      id="education"
      className="section-pad section-y relative"
      aria-labelledby="education-heading"
    >
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation"
          subtitle="Engineering rigor from NIT Trichy, extended through a Computer Science minor."
        />

        <div className="relative">
          {EDUCATION.map((edu, i) => (
            <Reveal key={edu.id} delay={i * 0.1}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="glow-border glass-strong relative overflow-hidden rounded-2xl p-6 md:p-8"
              >
                <div
                  className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-secondary/10 blur-3xl"
                  aria-hidden
                />

                <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                      <GraduationCap size={24} aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold md:text-2xl">
                        <span className="gradient-text">{edu.institution}</span>
                      </h3>
                      <p className="mt-1 text-base text-white/90">
                        {edu.degree} in {edu.field}
                      </p>
                      {edu.minor && (
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-primary">
                          <BookOpen size={14} aria-hidden />
                          Minor: <strong className="text-base">{edu.minor}</strong>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted md:flex-col md:items-end md:text-right">
                    <span className="flex items-center gap-1.5 md:justify-end">
                      <Calendar size={13} aria-hidden />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5 md:justify-end">
                      <MapPin size={13} aria-hidden />
                      {edu.location}
                    </span>
                  </div>
                </div>

                <ul className={cn('relative mt-6 space-y-2 border-t border-white/5 pt-6')} role="list">
                  {edu.details.map((detail) => (
                    <li key={detail} className="flex gap-2.5 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-secondary" aria-hidden />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
