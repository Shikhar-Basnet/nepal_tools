// app/contact/page.js
'use client'
import { useState } from 'react'
import { Mail, MessageSquare, User, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())                          e.name    = 'Name is required.'
    if (!form.email.trim())                         e.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.subject.trim())                       e.subject = 'Subject is required.'
    if (form.message.trim().length < 10)            e.message = 'Message must be at least 10 characters.'
    return e
  }

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setStatus('sending')
    // Replace with your actual form endpoint (Formspree, EmailJS, etc.)
    await new Promise(r => setTimeout(r, 1400))
    setStatus('success')
  }

  // ── Field component (defined inline to keep this file self-contained)
  const Field = ({ id, label, icon: Icon, error, children }) => (
    <div>
      <label htmlFor={id}
        className="block text-[13px] font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
        {label}
      </label>
      <div className={`flex items-start gap-2.5 px-3 rounded-lg border bg-[#f8f9fa] dark:bg-[#495057] transition-all duration-150
        ${error
          ? 'border-[#d93025] dark:border-[#f28b82]'
          : 'border-[#dadce0] dark:border-[#404144] focus-within:border-[#1a73e8] dark:focus-within:border-[#8ab4f8] focus-within:shadow-[0_0_0_2px_rgba(26,115,232,0.2)]'
        }`}>
        <Icon size={15} className="text-[#80868b] dark:text-[#9aa0a6] mt-[11px] shrink-0" />
        {children}
      </div>
      {error && (
        <p className="mt-1 text-[12px] text-[#d93025] dark:text-[#f28b82] flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  )

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#f1f3f4] dark:bg-[#1a1b1e] flex items-center justify-center px-4">
        <div className="bg-white dark:bg-[#343a40] rounded-2xl border border-[#dadce0] dark:border-[#6c757d] px-8 py-12 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/40 mb-5">
            <CheckCircle size={28} className="text-[#1e8e3e] dark:text-[#81c995]" />
          </div>
          <h2 className="text-[20px] font-medium text-[#202124] dark:text-[#e8eaed] mb-2">
            Message sent!
          </h2>
          <p className="text-[14px] text-[#5f6368] dark:text-[#9aa0a6] mb-6 leading-relaxed">
            Thanks for reaching out. We will get back to you as soon as possible.
          </p>
          <button
            onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setStatus('idle') }}
            className="px-5 py-2.5 rounded-lg border border-[#dadce0] dark:border-[#6c757d] text-[13px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#f1f3f4] dark:hover:bg-[#495057] touch-manipulation"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header card */}
        <div className="bg-white dark:bg-[#343a40] rounded-2xl border border-[#dadce0] dark:border-[#404144] px-6 py-7 mb-5 flex gap-4 items-start">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#e8f0fe] dark:bg-[#1a3a5c]">
            <Mail size={20} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
          </div>
          <div>
            <h1 className="text-[20px] font-medium text-[#202124] dark:text-[#e8eaed] mb-1 tracking-tight">
              Contact Us
            </h1>
            <p className="text-[14px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Have a question, suggestion, or found a bug? Fill out the form and
              we will get back to you shortly.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white dark:bg-[#343a40] rounded-2xl border border-[#dadce0] dark:border-[#404144] px-6 py-7">
          <div className="flex flex-col gap-5">

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field id="name" label="Full Name" icon={User} error={errors.name}>
                <input
                  id="name" name="name" type="text"
                  value={form.name} onChange={handleChange}
                  placeholder="Shikhar Basnet"
                  className="flex-1 py-2.5 bg-transparent text-[14px] text-[#202124] dark:text-[#e8eaed] placeholder-[#80868b] dark:placeholder-[#5f6368] outline-none"
                />
              </Field>
              <Field id="email" label="Email Address" icon={Mail} error={errors.email}>
                <input
                  id="email" name="email" type="email"
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="flex-1 py-2.5 bg-transparent text-[14px] text-[#202124] dark:text-[#e8eaed] placeholder-[#80868b] dark:placeholder-[#5f6368] outline-none"
                />
              </Field>
            </div>

            {/* Subject */}
            <Field id="subject" label="Subject" icon={MessageSquare} error={errors.subject}>
              <input
                id="subject" name="subject" type="text"
                value={form.subject} onChange={handleChange}
                placeholder="e.g. Bug report, Feature request..."
                className="flex-1 py-2.5 bg-transparent text-[14px] text-[#202124] dark:text-[#e8eaed] placeholder-[#80868b] dark:placeholder-[#5f6368] outline-none"
              />
            </Field>

            {/* Message */}
            <div>
              <label htmlFor="message"
                className="block text-[13px] font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
                Message
              </label>
              <div className={`rounded-lg border bg-[#f8f9fa] dark:bg-[#35363a] transition-all duration-150
                ${errors.message
                  ? 'border-[#d93025] dark:border-[#f28b82]'
                  : 'border-[#dadce0] dark:border-[#404144] focus-within:border-[#1a73e8] dark:focus-within:border-[#8ab4f8] focus-within:shadow-[0_0_0_2px_rgba(26,115,232,0.2)]'
                }`}>
                <textarea
                  id="message" name="message" rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-3 py-2.5 bg-transparent text-[14px] text-[#202124] dark:text-[#e8eaed] placeholder-[#80868b] dark:placeholder-[#5f6368] outline-none resize-none leading-relaxed"
                />
              </div>
              {errors.message && (
                <p className="mt-1 text-[12px] text-[#d93025] dark:text-[#f28b82] flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.message}
                </p>
              )}
              <p className="mt-1 text-[11px] text-[#80868b] dark:text-[#5f6368] text-right">
                {form.message.length} characters
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#1a73e8] dark:bg-[#8ab4f8] text-white dark:text-[#1a1b1e] text-[14px] font-medium hover:bg-[#1557b0] dark:hover:bg-[#aecbfa] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 touch-manipulation"
            >
              {status === 'sending' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </button>

          </div>
        </div>

        {/* Alt contact info */}
        <div className="mt-5 bg-white dark:bg-[#343a40] rounded-2xl border border-[#dadce0] dark:border-[#404144] px-6 py-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#e8f0fe] dark:bg-[#1a3a5c]">
            <Mail size={16} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-[#202124] dark:text-[#e8eaed]">
              Email
            </p>
            <a href="mailto:shikharbasnet123@gmail.com"
              className="text-[13px] text-[#1a73e8] dark:text-[#8ab4f8] hover:underline">
              shikharbasnet123@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}