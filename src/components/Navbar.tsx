import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, PERSONAL } from '../constants'
import { useActiveSection } from '../hooks'
import { scrollToId, cn } from '../utils'

export default function Navbar() {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'glass-strong py-3 shadow-lg shadow-black/30' : 'bg-transparent py-5',
      )}
    >
      <nav
        className="section-pad mx-auto flex max-w-7xl items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            go('home')
          }}
          className="font-display group flex items-center gap-2 text-lg font-bold tracking-tight"
          data-cursor="hover"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-sm text-primary">
            DK
          </span>
          <span className="hidden sm:inline">
            {PERSONAL.firstName}
            <span className="text-primary">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.id)
                }}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm transition-colors',
                  active === link.id ? 'text-primary' : 'text-muted hover:text-white',
                )}
                aria-current={active === link.id ? 'page' : undefined}
                data-cursor="hover"
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="glass rounded-lg p-2 text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          data-cursor="hover"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass-strong section-pad border-t border-white/5 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <ul className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className={cn(
                      'w-full rounded-xl px-4 py-3 text-left text-base',
                      active === link.id ? 'bg-primary/10 text-primary' : 'text-muted',
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
