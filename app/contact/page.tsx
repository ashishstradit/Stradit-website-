'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.querySelector('#c-name') as HTMLInputElement).value.trim()
    const email = (form.querySelector('#c-email') as HTMLInputElement).value.trim()
    const company = (form.querySelector('#c-company') as HTMLInputElement).value.trim()
    const msg = (form.querySelector('#c-message') as HTMLTextAreaElement).value.trim()
    if (!name || !email || !msg) { alert('Please fill in all required fields.'); return }
    const subject = encodeURIComponent(`Enquiry from ${name}${company ? ` — ${company}` : ''}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\n\nMessage:\n${msg}`)
    window.location.href = `mailto:reachout@stradit.com?subject=${subject}&body=${body}`
    setTimeout(() => setSubmitted(true), 600)
  }

  return (
    <>
      <Nav />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="contact" /></div>
        <div className="container hero__inner">
          <div className="hero__eyebrow eyebrow">Contact Us</div>
          <h1 className="hero__title">
            Big ideas deserve <em>real conversations.</em>
          </h1>
          <p className="hero__sub">
            Got a question? A challenge? A vision that needs a partner?<br/>
            Whether you&apos;re exploring a Global Capability Center, trying to unlock the true power of AI, migrating to the cloud, or just curious about what StradIT can do for you — we&apos;re here and we&apos;re listening.
          </p>
        </div>
        <div className="hero__hud">
          <span className="pulse">Inbox · Open</span>
          <span className="hero__hud-grid">
            <span>NY <b>9-6 ET</b></span><span>LDN <b>9-6 GMT</b></span><span>BLR <b>9-6 IST</b></span>
          </span>
          <span>Contact · v2026.05</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'80px',alignItems:'start'}} className="contact-grid">

            {/* LEFT — Reach Out + Social */}
            <div style={{display:'flex',flexDirection:'column',gap:'48px'}}>

              {/* Reach Out Your Way */}
              <div>
                <div className="section-eyebrow"><span className="idx">01</span><span>Reach Out Your Way</span></div>
                <h2 style={{fontSize:'clamp(24px,3vw,36px)',letterSpacing:'-0.03em',marginBottom:'24px'}}>Reach Out <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Your Way</em></h2>
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {[
                    {label:'General Enquiries',email:'reachout@stradit.com'},
                    {label:'Sales',email:'sales@stradit.com'},
                    {label:'Careers',email:'jobs@stradit.com'},
                  ].map(item=>(
                    <a key={item.email} href={`mailto:${item.email}`} className="contact-email-card">
                      <div className="contact-email-card__icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </div>
                      <div>
                        <div className="contact-email-card__label">{item.label}</div>
                        <div className="contact-email-card__email">{item.email}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Follow the Journey */}
              <div>
                <div className="section-eyebrow"><span className="idx">03</span><span>Follow the Journey</span></div>
                <h2 style={{fontSize:'clamp(24px,3vw,36px)',letterSpacing:'-0.03em',marginBottom:'8px'}}>Follow the <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Journey</em></h2>
                <p style={{color:'var(--text-2)',fontSize:'14px',marginBottom:'24px'}}>Let&apos;s build something remarkable together.</p>
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {[
                    {name:'LinkedIn',url:'https://www.linkedin.com/in/stradit-llc',icon:<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>},
                    {name:'Facebook',url:'https://www.facebook.com/people/Stradit-Reachout/pfbid032uUHtYjJCcvY4dc4p5K194jTMZ2ohD2pTbqpRq3TcYCmUfAmijVtNYVQe8sM7jPpl/',icon:<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>},
                    {name:'Instagram',url:'https://www.instagram.com/stradit23/',icon:<><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>},
                  ].map(s=>(
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      style={{display:'flex',alignItems:'center',gap:'14px',background:'var(--ink-1)',border:'1px solid var(--line)',borderRadius:'var(--radius)',padding:'16px 20px',transition:'all .2s ease',color:'inherit',textDecoration:'none'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor='var(--accent)';(e.currentTarget as HTMLAnchorElement).style.background='var(--ink-2)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor='var(--line)';(e.currentTarget as HTMLAnchorElement).style.background='var(--ink-1)'}}>
                      <div style={{width:'36px',height:'36px',borderRadius:'8px',background:'var(--accent-soft)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">{s.icon}</svg>
                      </div>
                      <span style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:500}}>{s.name}</span>
                      <span style={{marginLeft:'auto',color:'var(--accent)',fontFamily:'var(--font-mono)',fontSize:'12px'}}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Contact Form */}
            <div>
              <div className="section-eyebrow"><span className="idx">02</span><span>Send Us a Message</span></div>
              <h2 style={{fontSize:'clamp(24px,3vw,36px)',letterSpacing:'-0.03em',marginBottom:'32px'}}>Send Us a <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Message</em></h2>

              {!submitted ? (
                <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="c-name" style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--text-3)',display:'block',marginBottom:'6px'}}>Full Name *</label>
                      <input id="c-name" type="text" placeholder="Ada Lovelace" required style={{width:'100%',background:'var(--ink-1)',border:'1px solid var(--line)',borderRadius:'var(--radius-sm)',padding:'12px 14px',color:'var(--text-0)',fontSize:'14px',fontFamily:'inherit',outline:'none'}} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="c-email" style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--text-3)',display:'block',marginBottom:'6px'}}>Email *</label>
                      <input id="c-email" type="email" placeholder="ada@company.com" required style={{width:'100%',background:'var(--ink-1)',border:'1px solid var(--line)',borderRadius:'var(--radius-sm)',padding:'12px 14px',color:'var(--text-0)',fontSize:'14px',fontFamily:'inherit',outline:'none'}} />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="c-company" style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--text-3)',display:'block',marginBottom:'6px'}}>Company</label>
                    <input id="c-company" type="text" placeholder="Your organization" style={{width:'100%',background:'var(--ink-1)',border:'1px solid var(--line)',borderRadius:'var(--radius-sm)',padding:'12px 14px',color:'var(--text-0)',fontSize:'14px',fontFamily:'inherit',outline:'none'}} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="c-service" style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--text-3)',display:'block',marginBottom:'6px'}}>Area of Interest</label>
                    <select id="c-service" style={{width:'100%',background:'var(--ink-1)',border:'1px solid var(--line)',borderRadius:'var(--radius-sm)',padding:'12px 14px',color:'var(--text-0)',fontSize:'14px',fontFamily:'inherit',outline:'none'}}>
                      <option value="">Select a service...</option>
                      <option>Applied Artificial Intelligence</option>
                      <option>Data Analytics — Applied AI</option>
                      <option>Cyber Security — Applied AI</option>
                      <option>Cloud & Infrastructure — Applied AI</option>
                      <option>Automated AI Testing</option>
                      <option>Global Capability Center (GCC)</option>
                      <option>StartIT Training</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="c-message" style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--text-3)',display:'block',marginBottom:'6px'}}>Message *</label>
                    <textarea id="c-message" placeholder="Tell us what you're building or exploring..." required rows={5} style={{width:'100%',background:'var(--ink-1)',border:'1px solid var(--line)',borderRadius:'var(--radius-sm)',padding:'12px 14px',color:'var(--text-0)',fontSize:'14px',fontFamily:'inherit',outline:'none',resize:'vertical'}} />
                  </div>
                  <button type="submit" className="btn btn--primary" style={{width:'100%',justifyContent:'center',fontSize:'14px',padding:'13px 20px'}}>
                    Submit
                    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </button>
                  <p style={{textAlign:'center',fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'0.08em',color:'var(--text-3)'}}>
                    Your information stays with us. No spam. Ever.
                  </p>
                  <p style={{textAlign:'center',color:'var(--text-2)',fontSize:'13px',lineHeight:'1.6'}}>
                    No matter where you are and what your concerns are, we&apos;re just a message away.
                  </p>
                </form>
              ) : (
                <div style={{textAlign:'center',padding:'64px 32px',background:'var(--ink-1)',border:'1px solid var(--line)',borderRadius:'var(--radius-lg)'}}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" style={{margin:'0 auto 16px'}}><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
                  <h3 style={{fontFamily:'var(--font-display)',fontSize:'24px',letterSpacing:'-0.02em',marginBottom:'8px',color:'var(--teal)'}}>Message sent</h3>
                  <p style={{color:'var(--text-2)',fontSize:'14px',lineHeight:'1.6'}}>We&apos;ll be in touch within 24 hours.<br/>Thank you for reaching out to StradIT.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  )
}
