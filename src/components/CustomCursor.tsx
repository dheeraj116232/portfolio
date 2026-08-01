import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks'

/** Custom glowing cursor + soft follower */
export default function CustomCursor() {
  const isMobile = useIsMobile()
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    if (isMobile) return

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      const interactive = t.closest('a, button, [data-cursor="hover"], input, textarea')
      setHovering(Boolean(interactive))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onOver)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: clicking ? 0.7 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.2 }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        animate={{
          x: pos.x - (hovering ? 28 : 18),
          y: pos.y - (hovering ? 28 : 18),
          scale: hovering ? 1.35 : clicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.4 }}
      >
        <div
          className="rounded-full border border-primary/70 bg-primary/10"
          style={{
            width: hovering ? 56 : 36,
            height: hovering ? 56 : 36,
            boxShadow: '0 0 24px rgba(0,229,255,0.35)',
          }}
        />
      </motion.div>
    </>
  )
}
