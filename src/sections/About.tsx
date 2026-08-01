import { motion } from 'framer-motion'
import { MapPin, Quote } from 'lucide-react'
import { PERSONAL } from '../constants'
import Reveal, { Counter, SectionHeading } from '../components/ui'
import { cn } from '../utils'

const HIGHLIGHT = {
  cyan: 'font-semibold text-primary',
  violet: 'font-semibold text-violet-300',
  green: 'font-semibold text-emerald-300',
  amber: 'font-semibold text-amber-300',
} as const

export default function About() {
  return (
    <section
      id="about"
      className="section-pad section-y relative"
      aria-label="About"
    >
      <div className="pointer-events-none absolute inset-0 grid-atmosphere opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About"
          title="Engineering intelligence with purpose"
          subtitle="AI Engineer | Full-Stack Developer | NIT Trichy Graduate"
        />

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-16">
          <Reveal className="flex justify-center lg:justify-start">
            <div className="glow-border relative w-full max-w-[320px]">
              <div className="glass-strong overflow-hidden rounded-2xl p-3">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={PERSONAL.avatar}
                    alt={`Portrait of ${PERSONAL.name}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={320}
                    height={320}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                </div>
                <div className="mt-4 space-y-2 px-1 pb-1">
                  <p className="font-display text-lg font-bold text-white">{PERSONAL.name}</p>
                  <p className="flex items-center gap-1.5 text-sm text-muted">
                    <MapPin size={14} className="shrink-0 text-primary" aria-hidden />
                    {PERSONAL.location}
                  </p>
                  <p className="text-xs tracking-wide text-primary/80">
                    {PERSONAL.education} | {PERSONAL.graduation}
                  </p>
                </div>
              </div>
              <motion.div
                className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-2xl"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              />
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.08}>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  I'm <strong className={HIGHLIGHT.cyan}>Dheeraj Kumar</strong>, an AI Engineer and Civil Engineering graduate from <strong className={HIGHLIGHT.violet}>NIT Tiruchirappalli</strong> with a passion for building <strong className={HIGHLIGHT.green}>intelligent, scalable, and production-ready software</strong>. My work spans <strong className={HIGHLIGHT.amber}>Generative AI</strong>, <strong className={HIGHLIGHT.violet}>Large Language Models (LLMs)</strong>, <strong className={HIGHLIGHT.cyan}>Multi-Agent Systems</strong>, <strong className={HIGHLIGHT.amber}>Retrieval-Augmented Generation (RAG)</strong>, <strong className={HIGHLIGHT.green}>Machine Learning</strong>, and <strong className={HIGHLIGHT.violet}>Full-Stack Development</strong>.
                </p>
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  I enjoy transforming <strong className={HIGHLIGHT.amber}>complex ideas</strong> into <strong className={HIGHLIGHT.cyan}>reliable products</strong>, from <strong className={HIGHLIGHT.green}>AI-powered assistants</strong> and <strong className={HIGHLIGHT.violet}>autonomous agent workflows</strong> to <strong className={HIGHLIGHT.cyan}>modern web applications</strong> and <strong className={HIGHLIGHT.green}>cloud-native backend systems</strong>. My focus is on building solutions that are <strong className={HIGHLIGHT.amber}>scalable</strong>, <strong className={HIGHLIGHT.violet}>maintainable</strong>, and deliver <strong className={HIGHLIGHT.cyan}>measurable value</strong>.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div>
                <h3 className="mb-3 text-sm font-semibold tracking-[0.2em] text-white uppercase">
                  Focus Areas
                </h3>
                <ul className="flex flex-wrap gap-2" role="list">
                  {PERSONAL.focusAreas.map((area) => (
                    <li key={area}>
                      <span className="glass inline-block rounded-full px-3.5 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-primary/40 hover:text-primary">
                        {area}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <blockquote className="glass flex gap-3 rounded-xl p-4 md:p-5">
                <Quote size={20} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
                <p className="text-sm italic text-muted md:text-base">{PERSONAL.quote}</p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.26}>
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {PERSONAL.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={cn('glass glow-border rounded-xl p-4 text-center transition-transform hover:-translate-y-1')}
                  >
                    <dt className="font-display text-2xl font-bold text-white md:text-3xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </dt>
                    <dd className="mt-1 text-xs text-muted">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
