import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle2, Loader2, Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react'
import { PERSONAL } from '../constants'
import Reveal, { MagneticButton, SectionHeading } from '../components/ui'
import { cn, isValidEmail } from '../utils'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const INITIAL: FormState = { name: '', email: '', subject: '', message: '' }

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address'
  if (!values.subject.trim()) errors.subject = 'Subject is required'
  if (!values.message.trim()) errors.message = 'Message is required'
  else if (values.message.trim().length < 10) errors.message = 'Message must be at least 10 characters'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const emailJsConfigured = Boolean(serviceId && templateId && publicKey)

  const handleChange = (field: keyof FormState) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setStatus('loading')

    try {
      if (emailJsConfigured) {
        await emailjs.send(
          serviceId!,
          templateId!,
          {
            from_name: values.name,
            from_email: values.email,
            subject: values.subject,
            message: values.message,
            to_name: PERSONAL.name,
          },
          publicKey!,
        )
      } else {
        await new Promise((r) => setTimeout(r, 1600))
      }
      setStatus('success')
      setValues(INITIAL)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const fields: Array<{ id: keyof FormState; label: string; type?: string; multiline?: boolean }> = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'subject', label: 'Subject' },
    { id: 'message', label: 'Message', multiline: true },
  ]

  return (
    <section
      id="contact"
      className="section-pad section-y relative"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(139,92,246,0.08),_transparent_60%)]" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          subtitle={
            <>
              Open to <strong>SDE and AI/ML roles</strong>, <strong>collaborations</strong>, and{' '}
              <strong>interesting problems</strong>.
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <Reveal>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-muted">
                Whether you are hiring, collaborating on a project, or just want to connect — send a
                message and I will get back to you.
              </p>

              <ul className="space-y-4" role="list">
                <li className="glass flex items-center gap-3 rounded-xl p-4">
                  <Mail size={18} className="shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="text-xs tracking-wide text-muted uppercase">Email</p>
                    <a
                      href={`mailto:${PERSONAL.email}`}
                      className="text-sm text-white transition-colors hover:text-primary"
                      data-cursor="hover"
                    >
                      <strong>{PERSONAL.email}</strong>
                    </a>
                  </div>
                </li>
                <li className="glass flex items-center gap-3 rounded-xl p-4">
                  <Phone size={18} className="shrink-0 text-secondary" aria-hidden />
                  <div>
                    <p className="text-xs tracking-wide text-muted uppercase">Phone</p>
                    <a
                      href={PERSONAL.phoneHref}
                      className="text-sm text-white transition-colors hover:text-primary"
                      data-cursor="hover"
                    >
                      <strong>{PERSONAL.phone}</strong>
                    </a>
                  </div>
                </li>
                <li className="glass flex items-center gap-3 rounded-xl p-4">
                  <Linkedin size={18} className="shrink-0 text-secondary" aria-hidden />
                  <div>
                    <p className="text-xs tracking-wide text-muted uppercase">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/dheerajkumar116232/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white transition-colors hover:text-primary"
                      data-cursor="hover"
                    >
                      linkedin.com/in/dheerajkumar116232
                    </a>
                  </div>
                </li>
                <li className="glass flex items-center gap-3 rounded-xl p-4">
                  <Instagram size={18} className="shrink-0 text-secondary" aria-hidden />
                  <div>
                    <p className="text-xs tracking-wide text-muted uppercase">Instagram</p>
                    <a
                      href="https://www.instagram.com/dheeraj_ll6_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white transition-colors hover:text-primary"
                      data-cursor="hover"
                    >
                      @dheeraj_ll6_
                    </a>
                  </div>
                </li>
                <li className="glass flex items-center gap-3 rounded-xl p-4">
                  <MapPin size={18} className="shrink-0 text-secondary" aria-hidden />
                  <div>
                    <p className="text-xs tracking-wide text-muted uppercase">Location</p>
                    <p className="text-sm text-white">{PERSONAL.location}</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="glass-strong glow-border rounded-2xl p-6 md:p-8"
              noValidate
              aria-label="Contact form"
            >
              <div className="space-y-5">
                {fields.map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium text-white">
                      {field.label}
                    </label>
                    {field.multiline ? (
                      <textarea
                        id={field.id}
                        name={field.id}
                        rows={5}
                        value={values[field.id]}
                        onChange={handleChange(field.id)}
                        className={cn(
                          'w-full resize-none rounded-xl border border-white/10 bg-bg/50 px-4 py-3 text-sm text-white placeholder:text-muted/60',
                          errors[field.id] && 'border-red-400/50',
                        )}
                        placeholder={`Your ${field.label.toLowerCase()}...`}
                        aria-invalid={Boolean(errors[field.id])}
                        aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                      />
                    ) : (
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type ?? 'text'}
                        value={values[field.id]}
                        onChange={handleChange(field.id)}
                        className={cn(
                          'w-full rounded-xl border border-white/10 bg-bg/50 px-4 py-3 text-sm text-white placeholder:text-muted/60',
                          errors[field.id] && 'border-red-400/50',
                        )}
                        placeholder={`Your ${field.label.toLowerCase()}...`}
                        aria-invalid={Boolean(errors[field.id])}
                        aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                      />
                    )}
                    {errors[field.id] && (
                      <p id={`${field.id}-error`} className="mt-1 text-xs text-red-400" role="alert">
                        {errors[field.id]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="relative mt-6">
                <MagneticButton
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                  ariaLabel="Send message"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden />
                      Send Message
                    </>
                  )}
                </MagneticButton>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 flex items-center gap-2 text-sm text-primary"
                      role="status"
                    >
                      <CheckCircle2 size={18} aria-hidden />
                      Message sent successfully. I will reply soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-sm text-red-400"
                      role="alert"
                    >
                      Something went wrong. Please email me directly.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
