import type { ComponentType } from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import { ArrowUp, Code2, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { PERSONAL, SOCIAL_LINKS } from '../constants'
import { scrollToId } from '../utils'

const SOCIAL_ICONS: Record<string, ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  leetcode: SiLeetcode,
  code360: Code2,
  email: Mail,
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="section-pad border-t border-white/5 py-10" aria-label="Site footer">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('home')
            }}
            className="font-display text-lg font-bold gradient-text"
            data-cursor="hover"
          >
            {PERSONAL.firstName}
            <span className="text-white/80">.{PERSONAL.lastName.split(' ')[0]?.toLowerCase()}</span>
          </a>
          <p className="mt-1 text-xs text-muted">
            AI Engineer · {PERSONAL.education} {PERSONAL.graduation}
          </p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex flex-wrap items-center justify-center gap-3" role="list">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.id]
              if (!Icon) return null
              return (
                <li key={link.id}>
                  <motion.a
                    href={link.href}
                    target={link.id === 'email' ? undefined : '_blank'}
                    rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
                    aria-label={link.label}
                    className="glass flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-colors hover:border-primary/40 hover:text-primary"
                    whileHover={{ y: -2 }}
                    data-cursor="hover"
                  >
                    <Icon size={18} aria-hidden />
                  </motion.a>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => scrollToId('home')}
          className="glass group flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium tracking-wide text-muted uppercase transition-colors hover:text-primary"
          aria-label="Back to top"
          data-cursor="hover"
        >
          Back to top
          <ArrowUp
            size={14}
            className="transition-transform group-hover:-translate-y-0.5"
            aria-hidden
          />
        </button>
      </div>

      <p className="mx-auto mt-8 max-w-7xl text-center text-xs text-muted/70">
        &copy; {year} {PERSONAL.name}. Crafted with React, Three.js, and Framer Motion.
      </p>
    </footer>
  )
}
