import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

/** Animated loading screen with percentage + gradient brand mark */
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame = 0
    let value = 0
    const tick = () => {
      value += Math.random() * 7 + 2
      if (value >= 100) {
        setProgress(100)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 450)
        }, 280)
        return
      }
      setProgress(Math.floor(value))
      frame = window.setTimeout(tick, 40 + Math.random() * 50)
    }
    frame = window.setTimeout(tick, 120)
    return () => clearTimeout(frame)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.45 }}
          role="status"
          aria-live="polite"
          aria-label={`Loading ${progress}%`}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="gradient-animate absolute -left-1/4 top-1/4 h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
            <div className="gradient-animate absolute -right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-secondary/25 blur-[110px]" />
          </div>

          <motion.div
            className="relative mb-10 flex h-28 w-28 items-center justify-center"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="glass glow-border absolute inset-0 rounded-2xl" />
            <span className="font-display text-4xl font-bold gradient-text">DK</span>
          </motion.div>

          <p className="font-display mb-6 text-sm tracking-[0.35em] text-muted uppercase">
            Initializing
          </p>

          <div className="mb-3 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>
          <p className="font-mono text-sm text-primary tabular-nums">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
