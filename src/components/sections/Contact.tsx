import { useRef, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Loader2,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Toast, type ToastState } from '@/components/ui/Toast'
import { PROFILE } from '@/data/portfolio'
import { slideInLeft, slideInRight, EASE } from '@/lib/motion'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { MagneticButton } from '@/components/ui/MagneticButton'

type Status = 'idle' | 'sending' | 'sent'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

type FormFields = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const EMPTY_FORM: FormFields = { name: '', email: '', subject: '', message: '' }
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form: FormFields): FormErrors {
  const errors: FormErrors = {}

  if (!form.name.trim()) errors.name = 'Please enter your name.'
  else if (form.name.trim().length < 2) errors.name = 'Name is too short.'

  if (!form.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_REGEX.test(form.email.trim()))
    errors.email = 'Please enter a valid email address.'

  if (!form.subject.trim()) errors.subject = 'Please add a subject.'
  else if (form.subject.trim().length < 3) errors.subject = 'Subject is too short.'

  if (!form.message.trim()) errors.message = 'Please write a message.'
  else if (form.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.'

  return errors
}

const CONTACT_ITEMS = [
  { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
  { icon: MapPin, label: 'Location', value: PROFILE.location },
]

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: PROFILE.github },
  { icon: Linkedin, label: 'LinkedIn', href: PROFILE.linkedin },
]

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState<FormFields>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [toast, setToast] = useState<ToastState>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const setField = (key: keyof FormFields, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  const showToast = (next: NonNullable<ToastState>) => {
    clearTimeout(toastTimer.current)
    setToast(next)
    toastTimer.current = setTimeout(() => setToast(null), 5000)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return

    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      showToast({ kind: 'error', message: 'Please fix the highlighted fields.' })
      return
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      showToast({
        kind: 'error',
        message: "Contact service isn't configured. Please add VITE_WEB3FORMS_ACCESS_KEY to your .env file.",
      })
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          from_name: 'Portfolio Contact Form',
        }),
      })

      const result = await response.json()
      if (result.success) {
        setStatus('sent')
        setForm(EMPTY_FORM)
        setErrors({})
        showToast({
          kind: 'success',
          message: "Message dispatched! Talk to you soon.",
        })
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch {
      setStatus('idle')
      showToast({
        kind: 'error',
        message: 'Something went wrong sending your message. Please try again.',
      })
    }
  }

  return (
    <Section
      id="contact"
      number="06"
      eyebrow="Contact"
      title="Let's build something together"
      description="Open to internships and collaborations in AI, ML, Data Science and Backend engineering."
    >
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        
        {/* Left: details wrapped in Spotlight Card */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="h-full"
        >
          <SpotlightCard
            radius={300}
            spotlightColor="rgba(200, 164, 97, 0.08)"
            className="bg-card/20 border-border p-6 sm:p-8 h-full flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div>
                <span className="mono-label text-[10px]">Contact Info</span>
                <div className="h-px w-full bg-border/40 mt-2 mb-6" />
              </div>
              
              <div className="space-y-4">
                {CONTACT_ITEMS.map((item) => {
                  const inner = (
                    <div className="flex items-center gap-4 border-l-2 border-border/80 py-2.5 pl-4 transition-colors duration-300 hover:border-accent group">
                      <item.icon className="h-4.5 w-4.5 text-dim group-hover:text-accent transition-colors duration-300" />
                      <div>
                        <p className="mono-label text-[9px] uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  )
                  return item.href ? (
                    <a key={item.label} href={item.href} className="block">
                      {inner}
                    </a>
                  ) : (
                    <div key={item.label}>{inner}</div>
                  )
                })}
              </div>
            </div>

            <div className="mt-12">
              <p className="mono-label text-[9px] uppercase tracking-wider mb-4">Elsewhere</p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/30 text-muted transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/5"
                  >
                    <s.icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right: form or success overlay */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative min-h-[400px]"
        >
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col items-center justify-center text-center p-8 border border-border bg-card/25 rounded-3xl min-h-[400px]"
              >
                {/* SVG circular drawing checkmark animation */}
                <div className="relative mb-6">
                  <motion.svg
                    initial="hidden"
                    animate="visible"
                    className="w-16 h-16 text-accent"
                    viewBox="0 0 52 52"
                    fill="none"
                  >
                    {/* Circle perimeter draw */}
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                          pathLength: 1,
                          opacity: 1,
                          transition: { duration: 0.8, ease: EASE },
                        },
                      }}
                    />
                    {/* Check vector draw */}
                    <motion.path
                      d="M16 26l7 7 13-13"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={{
                        hidden: { pathLength: 0 },
                        visible: {
                          pathLength: 1,
                          transition: { delay: 0.6, duration: 0.5, ease: 'easeOut' },
                        },
                      }}
                    />
                  </motion.svg>
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">Transmission Successful</h3>
                <p className="text-sm text-muted max-w-sm">
                  Thanks for getting in touch! Your message was received securely. I will review and reply as soon as possible.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-xs font-mono text-accent border border-accent/25 rounded-full px-5 py-2.5 hover:bg-accent/5 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Name"
                    value={form.name}
                    onChange={(v) => setField('name', v)}
                    error={errors.name}
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setField('email', v)}
                    error={errors.email}
                  />
                </div>

                <Field
                  id="subject"
                  label="Subject"
                  value={form.subject}
                  onChange={(v) => setField('subject', v)}
                  error={errors.subject}
                />

                <Field
                  id="message"
                  label="Message"
                  value={form.message}
                  onChange={(v) => setField('message', v)}
                  multiline
                  rows={6}
                  error={errors.message}
                />

                <div className="mt-2">
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                    onClick={() => {}} // Form submission handled by onSubmit
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send message
                      </>
                    )}
                  </MagneticButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </Section>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  error,
  multiline = false,
  rows = 5,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  error?: string
  multiline?: boolean
  rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative flex flex-col pt-5">
      {/* Floating Label */}
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-4 text-sm font-medium transition-colors"
        initial={false}
        animate={{
          y: (focused || hasValue) ? -20 : 12,
          x: (focused || hasValue) ? -16 : 0,
          scale: (focused || hasValue) ? 0.85 : 1,
          color: error
            ? '#f87171'
            : (focused ? '#C8A461' : '#8A8A8E')
        }}
        transition={{ duration: 0.25, ease: EASE }}
        style={{ originX: 0, originY: 0 }}
      >
        {label}
      </motion.label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-h-[140px] resize-none rounded-xl border bg-card/10 px-4 py-3.5 text-sm text-white placeholder:text-transparent transition-all focus:outline-none focus:bg-card/30 ${
            error
              ? 'border-red-400/30'
              : 'border-border focus:border-accent/40'
          }`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`rounded-xl border bg-card/10 px-4 py-3.5 text-sm text-white placeholder:text-transparent transition-all focus:outline-none focus:bg-card/30 ${
            error
              ? 'border-red-400/30'
              : 'border-border focus:border-accent/40'
          }`}
        />
      )}

      {/* Center-expanding active gold line */}
      <div className="absolute bottom-0 left-4 right-4 h-[1.5px] overflow-hidden pointer-events-none">
        <motion.div
          className={`h-full ${error ? 'bg-red-400' : 'bg-accent'}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (focused || error) ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ originX: 0.5 }}
        />
      </div>

      {error && (
        <p id={`${id}-error`} className="absolute -bottom-5 left-0 text-[10px] font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
