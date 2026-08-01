import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Sparkles } from 'lucide-react'
import { PERSONAL } from '../constants'
import { MagneticButton } from '../components/ui'
import { scrollToId } from '../utils'

const HeroScene = lazy(() => import('../components/three/HeroScene'))

function Typewriter({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    const speed = deleting ? 35 : 70

    if (!deleting && text === word) {
      const pause = setTimeout(() => setDeleting(true), 1600)
      return () => clearTimeout(pause)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const t = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, index, words])

  return (
    <span className="inline-flex min-h-[1.2em] items-center text-primary" aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-primary" />
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
      aria-label="Hero"
    >
      <Suspense
        fallback={
          <div className="absolute inset-0 z-0 bg-bg">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.1),_transparent_60%)]" />
          </div>
        }
      >
        <HeroScene className="absolute inset-0 z-0" />
      </Suspense>

      <div className="section-pad relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
            <Sparkles size={14} aria-hidden />
            Open to SDE / AI-ML roles · NIT Trichy &apos;26
          </p>

          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block text-white/90">Hi,</span>
            <span className="block text-white/90">I&apos;m</span>
            <span className="gradient-text block">{PERSONAL.name}</span>
          </h1>

          <p className="mt-6 text-xl font-medium text-white/90 md:text-2xl">
            <Typewriter words={PERSONAL.roles} />
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            I build <strong>intelligent AI systems</strong>, <strong>scalable web applications</strong>, and{' '}
            <strong>immersive digital experiences</strong>.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <MagneticButton onClick={() => scrollToId('projects')} variant="primary">
              Explore Projects
            </MagneticButton>
            <MagneticButton
              href={PERSONAL.resumeUrl}
              variant="secondary"
              download
              ariaLabel="Download resume"
            >
              <Download size={16} aria-hidden />
              Download Resume
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('about')
        }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.25em] text-muted uppercase"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
        data-cursor="hover"
      >
        Scroll
        <ArrowDown size={16} className="text-primary" />
      </motion.a>
    </section>
  )
}
