/** Smooth-scroll to a section id (works with Lenis & native) */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Clamp a number between min and max */
export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

/** Format a counter display value */
export function formatStat(value: number, suffix = '') {
  return `${value}${suffix}`
}

/** Simple email validation */
export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

/** Class name helper */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}
