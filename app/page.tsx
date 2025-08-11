'use client'

import { useState, useMemo } from 'react'

function TestPanel() {
  if (typeof window === 'undefined') return null
  if (!window.location.hash.includes('test')) return null
  const validateEmail = (email: string) => /.+@.+\..+/.test(email)
  const results = [
    { name: 'validateEmail good', pass: validateEmail('a@b.co') === true },
    { name: 'validateEmail bad', pass: validateEmail('abc') === false },
  ]
  const allPass = results.every(r => r.pass)
  return (
    <div style={{position:'fixed',bottom:12,right:12,background:'#111',color:'#fff',padding:12,borderRadius:12,zIndex:9999}}>
      <div style={{fontWeight:800,marginBottom:6}}>Test Results</div>
      {results.map(r=> (<div key={r.name}>{r.pass ? '✅' : '❌'} {r.name}</div>))}
      <div style={{marginTop:6,fontWeight:700}}>{allPass ? 'ALL PASS' : 'SOME FAIL'}</div>
    </div>
  )
}

export default function Site() {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const contactEndpoint = useMemo(() => {
    return 'https://formsubmit.co/ajax/om.onenest@gmail.com'
  }, [])

  async function onContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setStatus('idle')
    try {
      const form = e.currentTarget
      const data = new FormData(form)
      if (!data.get('_subject')) data.set('_subject', 'New OmniBeat AI inquiry')
      const payload: Record<string,string> = {}
      data.forEach((v, k) => { payload[k] = String(v) })
      const res = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A1A]">
      <TestPanel />
      <header className="sticky top-0 z-50 backdrop-blur bg-[#FAF7F2]/80 border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 80 80" aria-label="OmniBeat AI logo" className="shrink-0">
              <defs>
                <linearGradient id="gHeader" x1="0" x2="1">
                  <stop offset="0%" stopColor="#31C48D" />
                  <stop offset="100%" stopColor="#7CE0B7" />
                </linearGradient>
              </defs>
              <circle cx="40" cy="40" r="32" fill="url(#gHeader)" />
              <path d="M16 40 h14 l6 -10 l8 20 l6 -12 h14" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold tracking-tight text-lg">OmniBeat AI</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:opacity-80">How it works</a>
            <a href="#voice" className="hover:opacity-80">Voice Assistant</a>
            <a href="#social" className="hover:opacity-80">Social Content</a>
            <a href="#pricing" className="hover:opacity-80">Pilot Pricing</a>
            <a href="#faqs" className="hover:opacity-80">FAQs</a>
          </nav>
          <a href="#book" className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-[#31C48D] text-black font-semibold shadow-sm hover:shadow-md transition-all">Book a demo</a>
        </div>
      </header>

      <section id="home" className="overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Always on, always on‑brand.
            </h1>
            <p className="mt-4 text-lg text-[#333]">
              <strong>Be reachable. Stay visible.</strong> Done‑for‑you <strong>AI voice assistant</strong> and <strong>weekly social media</strong> for Connecticut restaurants, bars, salons, and retail. We set it up. You get your time back.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#book" className="px-5 py-3 rounded-2xl bg-[#31C48D] text-black font-semibold shadow-sm hover:shadow-md">Book a demo</a>
              <a href="#kit" className="px-5 py-3 rounded-2xl border border-black/10 hover:border-black/20">Get the AI Starter Kit</a>
            </div>
            <div className="mt-4 text-sm text-[#555]">Serving Connecticut statewide • Email-first support</div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl bg-white shadow-xl border border-black/5 p-4">
              <div className="h-full rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(49,196,141,0.15),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.06),transparent_60%)] grid place-items-center">
                <div className="text-center">
                  <div className="text-sm uppercase tracking-widest text-black/60">Live Demo</div>
                  <div className="mt-2 text-2xl font-semibold">AI answers in ~1.2s*</div>
                  <div className="mt-2 text-sm text-black/60">*Typical target. Final speed depends on carrier/network.</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 rotate-2 bg-black text-white px-3 py-2 rounded-xl text-xs shadow">CT small‑biz friendly</div>
          </div>
        </div>
      </section>

      <section id="how" className="py-16 md:py-24 border-t border-black/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
          <p className="mt-2 text-[#444]">Simple, fast, and done for you.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { title: '1) Quick discovery', body: 'Tell us your rush hours, FAQs, and brand voice. 20–30 minutes on Zoom or in‑person.' },
              { title: '2) Install & train', body: 'We set up the voice agent and content templates in 24–48 hours. You review a short demo before launch.' },
              { title: '3) Launch & report', body: 'Calls get answered, posts go live. You get a weekly snapshot of bookings, calls handled, and content performance.' },
            ].map((s, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl border border-black/5 shadow-sm">
                <div className="text-sm text-black/60">Step {i + 1}</div>
                <div className="mt-2 font-semibold text-lg">{s.title}</div>
                <p className="mt-1 text-[#444]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="voice" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">AI Voice Assistant — answer every call, even at rush</h3>
            <ul className="mt-4 space-y-2 text-[#333] list-disc pl-5">
              <li>Greets callers, answers top FAQs (hours, menu, services).</li>
              <li>Books reservations/appointments and sends confirmation texts.</li>
              <li>Smart handoff to you for complex questions.</li>
              <li>Bilingual option on request.</li>
              <li>Weekly report: calls answered, bookings, common questions.</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="#book" className="px-5 py-3 rounded-2xl bg-[#31C48D] text-black font-semibold shadow-sm hover:shadow-md">Hear a demo</a>
              <a href="#faqs" className="px-5 py-3 rounded-2xl border border-black/10 hover:border-black/20">FAQs</a>
            </div>
            <p className="mt-3 text-xs text-black/60">Privacy & consent settings available. We can include an audio disclosure when required.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-black/5 shadow-sm">
            <div className="font-semibold">What it sounds like</div>
            <div className="mt-2 text-sm text-black/70">“Thanks for calling Maya Café — I can help with today’s hours, reservations, and specials. How can I help?”</div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              {['Reservations','Menu & hours','Text confirmations'].map((t, i)=> (
                <div key={i} className="p-3 rounded-2xl bg-[#FAF7F2] border border-black/5 text-center">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="social" className="py-16 md:py-24 border-t border-black/5">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 p-6 bg-white rounded-3xl border border-black/5 shadow-sm">
            <div className="font-semibold">What you receive</div>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-[#333]">
              <li>Weekly content plan (IG/FB/TikTok optional).</li>
              <li>12 ready‑to‑post designs per 3‑week pilot.</li>
              <li>2 short vertical videos (reels) with captions.</li>
              <li>Brand‑matched templates for future use.</li>
              <li>Alt‑text, hashtags, and posting schedule.</li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Done‑for‑you Social Content — stay active without extra staff</h3>
            <p className="mt-3 text-[#333]">We turn your menu, services, and promos into clean, on‑brand posts. Send ideas via WhatsApp or Telegram — we handle the rest.</p>
            <div className="mt-6 flex gap-3">
              <a href="#book" className="px-5 py-3 rounded-2xl bg-[#31C48D] text-black font-semibold shadow-sm hover:shadow-md">See sample posts</a>
              <a href="#pricing" className="px-5 py-3 rounded-2xl border border-black/10 hover:border-black/20">Pilot pricing</a>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Pilot Package (project‑based)</h3>
          <p className="mt-2 text-[#444]">Start with a 3‑week pilot. No subscription required. Upgrade later if you love it.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-black/5 shadow-sm">
              <div className="text-sm uppercase tracking-widest text-black/60">Voice Setup</div>
              <div className="mt-2 text-2xl font-bold">$299 one‑time</div>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-[#333]">
                <li>Agent configured to your FAQs</li>
                <li>1 reservation/appointment flow</li>
                <li>SMS confirmation templates</li>
                <li>Live test + tweaks</li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-black/5 shadow-sm ring-2 ring-[#31C48D]">
              <div className="text-sm uppercase tracking-widest text-black/60">Pilot Bundle</div>
              <div className="mt-2 text-2xl font-bold">$499 project</div>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-[#333]">
                <li>Everything in Voice Setup</li>
                <li>+ 12 social posts (3 weeks)</li>
                <li>+ 2 short video ads</li>
                <li>Weekly performance snapshot</li>
              </ul>
              <a href="#book" className="mt-5 inline-flex px-5 py-3 rounded-2xl bg-[#31C48D] text-black font-semibold shadow-sm hover:shadow-md">Book pilot</a>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-black/5 shadow-sm">
              <div className="text-sm uppercase tracking-widest text-black/60">Add‑Ons</div>
              <div className="mt-2 text-2xl font-bold">from $99</div>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-[#333]">
                <li>Extra reel or post pack</li>
                <li>Bilingual voice</li>
                <li>Menu/Service bot for DMs</li>
                <li>Reservation/CRM integration</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-black/70">Guarantee: If we don’t measurably reduce missed calls compared to your baseline during the pilot, we’ll work an extra week at no cost.</p>
        </div>
      </section>

      <section id="faqs" className="py-16 md:py-24 border-t border-black/5">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight">FAQs</h3>
          <div className="mt-8 divide-y divide-black/10">
            {[
              { q: 'Do you replace my front‑desk staff?', a: 'No. The agent catches calls when humans are busy or closed, answers FAQs, and books simple reservations. Complex calls can transfer to you.' },
              { q: 'How fast can we start?', a: 'Most pilots launch within 24–48 hours after a 20–30 minute discovery call.' },
              { q: 'What do you need from us?', a: 'Hours, menu/services, a few common questions, and brand tone. For social content, any photos or promos you want featured.' },
              { q: 'Can you integrate with our POS or reservation system?', a: 'Often, yes. We can connect to common tools or set up a lightweight form/Sheet workflow during the pilot.' },
              { q: 'Is there a contract?', a: 'No long contracts for pilots. If you continue after the pilot, we can discuss a simple monthly or per‑project plan.' },
              { q: 'What about privacy and call recording?', a: 'We can enable a short disclosure and follow your state’s consent rules. Recording is optional and off by default.' },
            ].map((item, i) => (
              <details key={i} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span>{item.q}</span>
                  <span className="transition-transform group-open:rotate-45 select-none">+</span>
                </summary>
                <p className="mt-2 text-[#444]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center bg-white rounded-3xl border border-black/5 shadow-sm p-10">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Contact us</h3>
          <p className="mt-2 text-[#444]">Drop your details and we’ll reach out within one business day.</p>

          <form onSubmit={onContactSubmit} action="https://formsubmit.co/om.onenest@gmail.com" method="POST" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            <input name="name" required placeholder="Your name" className="px-4 py-3 rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#31C48D] bg-[#FAF7F2]" />
            <input name="business" placeholder="Business name" className="px-4 py-3 rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#31C48D] bg-[#FAF7F2]" />
            <input type="email" name="email" required placeholder="Email" className="px-4 py-3 rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#31C48D] bg-[#FAF7F2]" />
            <input name="phone" placeholder="Phone (optional)" className="px-4 py-3 rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#31C48D] bg-[#FAF7F2]" />
            <input name="city" placeholder="City, CT" className="px-4 py-3 rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#31C48D] bg-[#FAF7F2]" />
            <select name="interest" className="px-4 py-3 rounded-2xl border border-black/10 bg-[#FAF7F2]">
              <option value="Voice Assistant">Voice Assistant</option>
              <option value="Social Content">Social Content</option>
              <option value="Both">Both</option>
            </select>
            <textarea name="message" placeholder="What do you need help with?" className="md:col-span-2 px-4 py-3 rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#31C48D] bg-[#FAF7F2]" rows={4}></textarea>
            <input type="hidden" name="_subject" value="New OmniBeat AI inquiry" />
            <input type="text" name="_honey" className="hidden" />
            <button disabled={sending} type="submit" className="md:col-span-2 px-5 py-3 rounded-2xl bg-[#31C48D] text-black font-semibold shadow-sm hover:shadow-md disabled:opacity-60">{sending ? 'Sending…' : 'Send message'}</button>
          </form>

          <div aria-live="polite" className="mt-3 text-sm min-h-[1.25rem]">
            {status === 'success' && <span className="text-green-700">Thanks! We received your message and will reply within one business day.</span>}
            {status === 'error' && <span className="text-red-700">Something went wrong. Please email <a href="mailto:om.onenest@gmail.com" className="underline">om.onenest@gmail.com</a>.</span>}
          </div>

          <div className="mt-4 text-sm text-black/70">Prefer email? Write to <a href="mailto:om.onenest@gmail.com" className="underline">om.onenest@gmail.com</a></div>

          <div id="kit" className="mt-10 text-left">
            <div className="font-semibold">Get the AI Starter Kit (free PDF)</div>
            <p className="mt-1 text-sm text-[#444]">We’ll send a quick guide to reducing missed calls and staying consistent on social—built for CT small businesses.</p>
            <form className="mt-4 grid md:grid-cols-[1fr_auto] gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Your email" className="px-4 py-3 rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#31C48D] bg-[#FAF7F2]" />
              <button className="px-5 py-3 rounded-2xl bg-black text-white font-semibold">Email me the kit</button>
            </form>
            <div className="mt-2 text-xs text-black/60">We’ll never share your email. Unsubscribe anytime.</div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-black/5">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">© {new Date().getFullYear()} OmniBeat AI • Connecticut</div>
          <div className="text-sm flex items-center gap-4">
            <a href="#faqs" className="hover:opacity-80">Privacy</a>
            <a href="#faqs" className="hover:opacity-80">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
