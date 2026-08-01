import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

/** Scroll-triggered reveal wrapper */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.15 })

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: ReactNode
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      <Reveal>
        <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
          <span className="gradient-text">{title}</span>
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.14}>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
  download?: boolean | string
  external?: boolean
}

export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  ariaLabel,
  download,
  external,
}: MagneticButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const base =
    'ripple inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors will-change-transform'

  const variants = {
    primary:
      'bg-gradient-to-r from-primary to-accent text-bg shadow-[0_0_28px_rgba(0,229,255,0.28)] hover:shadow-[0_0_40px_rgba(0,229,255,0.45)]',
    secondary:
      'glass text-white hover:border-primary/50 hover:text-primary',
    ghost: 'text-muted hover:text-white',
  }

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
  }

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.28,
      y: (e.clientY - rect.top - rect.height / 2) * 0.28,
    })
  }

  const onLeave = () => setOffset({ x: 0, y: 0 })

  const shared = {
    className: `${base} ${variants[variant]} ${className}`,
    style,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'aria-label': ariaLabel,
    'data-cursor': 'hover' as const,
  }

  if (href) {
    return (
      <a
        {...shared}
        href={href}
        onClick={onClick}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button {...shared} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

/** Animated number counter */
export function Counter({
  value,
  suffix = '',
  duration = 1.6,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const [display, setDisplay] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}
