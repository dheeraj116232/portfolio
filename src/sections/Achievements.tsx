import { motion } from 'framer-motion'
import {
  Trophy,
  Medal,
  Code2,
  FlaskConical,
  Rocket,
  GraduationCap,
  Award,
  type LucideIcon,
} from 'lucide-react'
import { useRef } from 'react'
import { ACHIEVEMENTS, CERTIFICATIONS, type Achievement } from '../constants'
import Reveal, { SectionHeading } from '../components/ui'
import { cn } from '../utils'

const ACHIEVEMENT_ICONS: Record<Achievement['icon'], LucideIcon> = {
  medal: Medal,
  trophy: Trophy,
  code: Code2,
  research: FlaskConical,
  hackathon: Rocket,
  school: GraduationCap,
}

/** Wrap key numbers/ranks in the About-style gradient strong tag */
function renderAchievementSubtitle(subtitle: string) {
  const parts = subtitle.split(/(#\d+|AIR \d+|25,000\+)/g)
  return parts.map((part, i) =>
    /^(#\d+|AIR \d+|25,000\+)$/.test(part) ? (
      <strong key={i}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  const Icon = ACHIEVEMENT_ICONS[item.icon] ?? Award

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="glass glow-border group flex h-full flex-col rounded-2xl p-5 transition-shadow hover:shadow-[0_0_32px_rgba(139,92,246,0.15)]"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 text-secondary transition-colors group-hover:bg-secondary/25">
          <Icon size={20} aria-hidden />
        </div>
        <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
        <p className="mt-1 text-xs font-medium text-primary">{renderAchievementSubtitle(item.subtitle)}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
      </motion.article>
    </Reveal>
  )
}

export default function Achievements() {
  const sliderRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="achievements"
      className="section-pad section-y relative bg-card/20"
      aria-labelledby="achievements-heading"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Achievements"
          title="Recognition and credentials"
          subtitle="Scholarships, competitions, and certifications that reflect consistent growth."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold">
              <span className="gradient-text">Certifications</span>
            </h3>
            <p className="mt-1 text-sm text-muted">
              <strong>Oracle AI</strong>, <strong>scholarships</strong>, and <strong>hackathon</strong>{' '}
              credentials
            </p>
          </div>

          <div
            ref={sliderRef}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Certifications"
          >
            {CERTIFICATIONS.map((cert, i) => (
              <motion.article
                key={cert.id}
                role="listitem"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={cn(
                  'glass glow-border w-[260px] shrink-0 snap-start rounded-xl p-5',
                  'transition-transform hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(0,229,255,0.12)]',
                )}
              >
                <Award size={22} className="text-primary" aria-hidden />
                <h4 className="mt-3 font-display text-base font-semibold text-white">{cert.title}</h4>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                <p className="mt-3 text-xs tracking-wide text-primary/80">{cert.year}</p>
                {cert.credential ? (
                  <a
                    href={cert.credential}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-primary underline transition-colors hover:text-cyan-200"
                  >
                    View certificate
                  </a>
                ) : null}
              </motion.article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
