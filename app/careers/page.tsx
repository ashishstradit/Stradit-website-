'use client'
import { useState, useRef, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'

/** Reveal stagger classes — matches `Stradit Careers (1).html` job list order */
const JOB_REVEAL_DELAY: (number | null)[] = [null, 1, 2, null, 1, 2, 3, null, 1, 2, 3, null, 1]

const JOBS = [
  { title: 'Senior ML Engineer — LLM Workflows', dept: 'Applied AI', loc: 'New York · London', type: 'Full-time · Hybrid', desc: 'Design and ship production LLM pipelines for capital-markets clients. Experience with RAG architectures, prompt engineering, and model evaluation required.' },
  { title: 'AI Governance & Safety Lead', dept: 'Applied AI', loc: 'London · Remote', type: 'Full-time', desc: 'Own AI risk frameworks, red-teaming, and compliance alignment for regulated client programs. NIST AI RMF and financial services background preferred.' },
  { title: 'AI Solutions Architect', dept: 'Applied AI', loc: 'New York · US and UK', type: 'Full-time · Hybrid', desc: 'Lead technical discovery and architecture design for enterprise AI programs. Breadth across LLMs, data pipelines, and cloud infrastructure essential.' },
  { title: 'Senior Data Engineer — Capital Markets', dept: 'Data', loc: 'New York · London', type: 'Full-time', desc: 'Build streaming data pipelines and governed data products for asset management and banking clients. Spark, dbt, Kafka, and financial domain knowledge.' },
  { title: 'Analytics Engineer', dept: 'Data', loc: 'US and UK · Remote', type: 'Full-time', desc: 'Model and document enterprise data domains, build semantic layers, and deliver analytics that decision-makers actually use. dbt and SQL mastery required.' },
  { title: 'AI Security Engineer', dept: 'Cyber', loc: 'London · New York', type: 'Full-time', desc: 'Secure AI systems against prompt injection, model exfiltration, and adversarial attacks. Red-team AI deployments and own the security design of LLM-powered workflows.' },
  { title: 'Compliance & Threat Intelligence Analyst', dept: 'Cyber', loc: 'London', type: 'Full-time', desc: 'Map client postures to NIST, ISO 27001, and SOC2 continuously. Build AI-assisted threat detection and compliance reporting pipelines.' },
  { title: 'Staff Platform Engineer — Cloud & Infrastructure', dept: 'Cloud', loc: 'New York · London · US and UK', type: 'Full-time · Hybrid', desc: 'Define landing-zone standards and lead cloud migrations for institutional clients. AWS/Azure/GCP expertise + strong Terraform and Kubernetes fundamentals.' },
  { title: 'FinOps Analyst', dept: 'Cloud', loc: 'US and UK · Remote', type: 'Full-time', desc: 'Drive cloud cost discipline for enterprise programs — tagging, allocation, rightsizing, and FinOps reporting. FinOps Foundation certification a plus.' },
  { title: 'Senior QA Automation Engineer', dept: 'QA', loc: 'US and UK · London', type: 'Full-time', desc: 'Build automation-first QA frameworks for AI-powered financial applications. Playwright, Cypress, and AI-assisted test generation experience valued.' },
  { title: 'AI Testing Specialist', dept: 'QA', loc: 'Remote · US and UK', type: 'Full-time', desc: 'Evaluate LLM outputs, design bias and hallucination test suites, and own synthetic data generation for regulated AI programs.' },
  { title: 'AI Program Director', dept: 'Strategy', loc: 'New York · London', type: 'Full-time', desc: 'Lead cross-functional AI transformation programs for Tier 1 financial institutions. CTO/CIO stakeholder management and delivery governance expertise required.' },
  { title: 'StartIT AI Training Lead', dept: 'Strategy', loc: 'New York · London · Remote', type: 'Full-time', desc: 'Design and deliver our AI upskilling curriculum for enterprise cohorts. Experience in corporate L&D or technical education at financial institutions preferred.' },
]

const FILTERS = ['All roles', 'Applied AI', 'Data Analytics', 'Cyber Security', 'Cloud', 'QA Engineering', 'Strategy']
const FILTER_TO_DEPT: Record<string, string> = { 'Applied AI': 'Applied AI', 'Data Analytics': 'Data', 'Cyber Security': 'Cyber', 'Cloud': 'Cloud', 'QA Engineering': 'QA', 'Strategy': 'Strategy' }
const DEPT_LABEL: Record<string, string> = { 'Applied AI': 'Applied AI', 'Data': 'Data Analytics', 'Cyber': 'Cyber Security', 'Cloud': 'Cloud', 'QA': 'QA Engineering', 'Strategy': 'Strategy' }

export default function CareersPage() {
  const [activeFilter, setActiveFilter] = useState('All roles')
  const [selectedRole, setSelectedRole] = useState('')
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [jobsLoaded, setJobsLoaded] = useState(false)
  const [workableJobs, setWorkableJobs] = useState<{ title: string; dept: string }[]>([])
  const applyRef = useRef<HTMLElement>(null)

  // Load Workable Embed script
  useEffect(() => {
    let script = document.querySelector('script[src="https://www.workable.com/assets/embed.js"]') as HTMLScriptElement;

    const initWorkable = () => {
      const w = window as any;
      if (w.whr && w.whr_embed) {
        w.whr(document).ready(() => {
          w.whr_embed(734377, {
            base: "jobs",
            detail: "titles",
            zoom: "country",
            grouping: "none",
          });
        });
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.src = "https://www.workable.com/assets/embed.js";
      script.async = true;
      script.onload = initWorkable;
      document.body.appendChild(script);
    } else {
      initWorkable();
    }
  }, []);

  // Observe Workable container to extract job lists and set loaded state
  useEffect(() => {
    const target = document.getElementById('whr_embed_hook');
    if (!target) return;

    const observer = new MutationObserver(() => {
      const items = target.querySelectorAll('.whr-item');
      if (items.length > 0) {
        const jobsList: { title: string; dept: string }[] = [];
        items.forEach(item => {
          const titleEl = item.querySelector('.whr-title a') || item.querySelector('.whr-title') || item.querySelector('h3 a') || item.querySelector('h3');
          const title = titleEl ? titleEl.textContent?.trim() || '' : '';
          const deptEl = item.querySelector('.whr-dept');
          
          let dept = deptEl ? deptEl.textContent?.trim() || '' : '';
          if (dept.toLowerCase().startsWith('department:')) {
            dept = dept.substring(11).trim();
          } else {
            const labelSpan = deptEl?.querySelector('span');
            if (labelSpan) {
              dept = deptEl?.textContent?.replace(labelSpan.textContent || '', '').trim() || '';
            }
          }
          if (title) {
            jobsList.push({ title, dept });
          }
        });

        setWorkableJobs(jobsList);
        setJobsLoaded(true);
      }
    });

    observer.observe(target, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Filter Workable jobs in the DOM
  useEffect(() => {
    const items = document.querySelectorAll('#whr_embed_hook .whr-item');
    items.forEach(item => {
      const htmlItem = item as HTMLElement;
      if (activeFilter === 'All roles') {
        htmlItem.classList.remove('whr-item-hidden');
      } else {
        const titleEl = item.querySelector('.whr-title a') || item.querySelector('.whr-title') || item.querySelector('h3 a') || item.querySelector('h3');
        const titleText = titleEl ? titleEl.textContent || '' : '';
        const deptEl = item.querySelector('.whr-dept');
        let deptText = deptEl ? deptEl.textContent || '' : '';
        if (deptText.toLowerCase().startsWith('department:')) {
          deptText = deptText.substring(11).trim();
        } else {
          const labelSpan = deptEl?.querySelector('span');
          if (labelSpan) {
            deptText = deptEl?.textContent?.replace(labelSpan.textContent || '', '').trim() || '';
          }
        }

        const f = activeFilter.toLowerCase();
        const d = deptText.toLowerCase();
        const t = titleText.toLowerCase();

        let isMatch = false;
        if (f === 'applied ai') {
          isMatch = (
            d.includes('ai') || d.includes('ml') || d.includes('intelligence') ||
            t.includes('ai') || t.includes('ml') || t.includes('machine learning') || t.includes('intelligence')
          );
        } else if (f === 'data analytics') {
          isMatch = (
            d.includes('data') || d.includes('analytics') || d.includes('bi') || d.includes('looker') || d.includes('quicksight') ||
            t.includes('data') || t.includes('analytics') || t.includes('bi') || t.includes('looker') || t.includes('quicksight')
          );
        } else if (f === 'cyber security') {
          isMatch = (
            d.includes('cyber') || d.includes('security') || d.includes('secops') || d.includes('mainframe') ||
            t.includes('cyber') || t.includes('security') || t.includes('secops') || t.includes('mainframe')
          );
        } else if (f === 'cloud') {
          isMatch = (
            d.includes('cloud') || d.includes('devops') || d.includes('platform') || d.includes('infrastructure') || d.includes('aws') || d.includes('azure') || d.includes('gcp') || d.includes('middleware') ||
            t.includes('cloud') || t.includes('devops') || t.includes('platform') || t.includes('infrastructure') || t.includes('aws') || t.includes('azure') || t.includes('gcp') || t.includes('middleware')
          );
        } else if (f === 'qa engineering') {
          isMatch = (
            d.includes('qa') || d.includes('quality') || d.includes('testing') || d.includes('automation') || d.includes('test') ||
            t.includes('qa') || t.includes('quality') || t.includes('testing') || t.includes('automation') || t.includes('test')
          );
        } else if (f === 'strategy') {
          isMatch = (
            d.includes('strategy') || d.includes('program') || d.includes('director') || d.includes('lead') || d.includes('manager') || d.includes('consultant') || d.includes('partner') || d.includes('analyst') ||
            t.includes('strategy') || t.includes('program') || t.includes('director') || t.includes('lead') || t.includes('manager') || t.includes('consultant') || t.includes('partner') || t.includes('analyst')
          );
        } else {
          isMatch = d.includes(f) || f.includes(d) || t.includes(f);
        }

        htmlItem.classList.toggle('whr-item-hidden', !isMatch);
      }
    });
  }, [activeFilter, workableJobs, jobsLoaded]);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('in')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [activeFilter, jobsLoaded])

  function handleSubmit() {
    const fname = (document.getElementById('fname') as HTMLInputElement)?.value.trim()
    const email = (document.getElementById('email') as HTMLInputElement)?.value.trim()
    const role = (document.getElementById('role') as HTMLSelectElement)?.value
    const msg = (document.getElementById('message') as HTMLTextAreaElement)?.value.trim()
    if (!fname || !email || !role || !msg) { alert('Please fill in all required fields.'); return }
    const loc = (document.getElementById('location') as HTMLSelectElement)?.value
    const li = (document.getElementById('linkedin') as HTMLInputElement)?.value.trim()
    const lname = (document.getElementById('lname') as HTMLInputElement)?.value.trim()
    const subject = encodeURIComponent(`Application: ${role} — ${fname} ${lname}`)
    const body = encodeURIComponent(`Application for: ${role}\nLocation preference: ${loc}\n\nName: ${fname} ${lname}\nEmail: ${email}\nLinkedIn: ${li || '—'}\n\nCover note:\n${msg}\n\n—\nSubmitted via stradit.com/careers`)
    window.location.href = `mailto:jobs@stradit.com?subject=${subject}&body=${body}`
    setTimeout(() => setSubmitted(true), 600)
  }

  return (
    <>
      <Nav activePage="careers" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero careers-hero" style={{ minHeight: '72vh', paddingTop: '80px' }}>
        <div className="hero__canvas">
          <AnimCanvas theme="careers" animKey="careers-hero" />
        </div>
        <div className="container hero__inner">
          <div className="eyebrow" style={{marginBottom:'28px'}}>Careers · Join Stradit</div>
          <h1 className="hero__title" style={{fontSize:'clamp(38px,5.5vw,76px)',letterSpacing:'-0.038em',marginBottom:'24px'}}>
            Building for the future of global <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2),var(--gold))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>capacity.</em>
          </h1>
          <p style={{fontSize:'clamp(16px,1.4vw,19px)',color:'var(--text-1)',maxWidth:'600px',marginBottom:'36px',lineHeight:'1.55'}}>
            We&apos;re looking for engineers, architects, data scientists, and operators who want to solve real challenges, create meaningful impact, and deliver results that matter at the most demanding regulated institutions on the planet.
          </p>
          <div className="hero__cta" style={{marginBottom:'56px'}}>
            <a className="btn btn--primary" href="#open-roles">
              View Open Roles<svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a className="btn btn--ghost" href="#apply">Send Your CV</a>
          </div>
          <div className="careers-hero-stats">
            <div className="careers-hero-stats__item">
              <div className="careers-hero-stats__k">Founded</div>
              <div className="careers-hero-stats__v">2014 <span className="careers-hero-stats__sub">10+ years deep</span></div>
            </div>
            <div className="careers-hero-stats__item careers-hero-stats__item--mid">
              <div className="careers-hero-stats__k">Open roles</div>
              <div className="careers-hero-stats__v">
                {jobsLoaded ? workableJobs.length : 18} <span className="careers-hero-stats__sub">across 5 practices</span>
              </div>
            </div>
            <div className="careers-hero-stats__item">
              <div className="careers-hero-stats__k">Remote</div>
              <div className="careers-hero-stats__v">Hybrid <span className="careers-hero-stats__sub">flexible by design</span></div>
            </div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Hiring live · {jobsLoaded ? workableJobs.length : 18} open roles</span>
          <span className="hero__hud-grid">
            <span>HUBS <b>3</b></span><span>OPEN ROLES <b>{jobsLoaded ? workableJobs.length : 18}</b></span><span>PRACTICES <b>5</b></span>
          </span>
          <span>Careers · v2026.05</span>
        </div>
      </header>

      {/* OPEN ROLES */}
      <section className="section" id="open-roles" style={{paddingTop:'60px',borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Open Roles</span></div>
          <div className="careers-open-intro">
            <h2 className="careers-open-intro__title">
              {jobsLoaded ? `${workableJobs.length} open roles` : '18 open roles'} across our global <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>practices.</em>
            </h2>
            <p className="careers-open-intro__lead">We hire for depth and curiosity. If you don&apos;t see your exact role below, send an open application — we&apos;re always interested in exceptional people.</p>
          </div>

          {/* Filters */}
          <div className="job-filters" id="job-filters">
            {FILTERS.map(f=>(
              <button key={f} className={`job-filter${activeFilter===f?' active':''}`} onClick={()=>setActiveFilter(f)}>{f}</button>
            ))}
          </div>

          {/* Job list container */}
          <div className="reveal" style={{ position: 'relative' }}>
            {!jobsLoaded && (
              <div className="job-list-loading-placeholder">
                <div className="loading-pulse-card">
                  <div className="pulse-title"></div>
                  <div className="pulse-meta">
                    <div className="pulse-tag"></div>
                    <div className="pulse-tag font-cyan"></div>
                  </div>
                </div>
                <div className="loading-pulse-card">
                  <div className="pulse-title"></div>
                  <div className="pulse-meta">
                    <div className="pulse-tag"></div>
                    <div className="pulse-tag font-cyan"></div>
                  </div>
                </div>
                <div className="loading-pulse-card">
                  <div className="pulse-title"></div>
                  <div className="pulse-meta">
                    <div className="pulse-tag"></div>
                    <div className="pulse-tag font-cyan"></div>
                  </div>
                </div>
              </div>
            )}
            <div id="whr_embed_hook"></div>
          </div>

          <div style={{marginTop:'24px',textAlign:'center'}}>
            <p style={{color:'var(--text-2)',fontSize:'14px',marginBottom:'16px'}}>Don&apos;t see your role? We&apos;re always looking for exceptional people.</p>
            <button className="btn btn--ghost" onClick={()=>{setSelectedRole('Open Application');applyRef.current?.scrollIntoView({behavior:'smooth'})}}>Send an open application</button>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="section apply-section" id="apply" ref={applyRef as any}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">02</span><span>Apply</span></div>
          <div className="apply-form-wrap">
            <div className="apply-intro">
              <h2>Apply to <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Stradit</em></h2>
              <p>Send your CV and a note about why you&apos;d like to join. All applications are reviewed by a senior member of our team — not an ATS bot.</p>
              <div className="contact-row">
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span>Resumes sent to <a href="mailto:jobs@stradit.com">jobs@stradit.com</a></span>
                </div>
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <span>We respond within 3 business days</span>
                </div>
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <span>First interview is a 30-min conversation with the hiring lead</span>
                </div>
              </div>
            </div>

            <div className="form">
              {!submitted ? (
                <div id="form-content">
                  <div className="form-row">
                    <div className="form-field"><label htmlFor="fname">First Name *</label><input type="text" id="fname" placeholder="Ada" required /></div>
                    <div className="form-field"><label htmlFor="lname">Last Name *</label><input type="text" id="lname" placeholder="Lovelace" required /></div>
                  </div>
                  <div className="form-field"><label htmlFor="email">Email *</label><input type="email" id="email" placeholder="ada@example.com" required /></div>
                  <div className="form-field"><label htmlFor="linkedin">LinkedIn Profile</label><input type="url" id="linkedin" placeholder="https://linkedin.com/in/..." /></div>
                  <div className="form-field">
                    <label htmlFor="role">Role Applying For *</label>
                    <select id="role" value={selectedRole} onChange={e=>setSelectedRole(e.target.value)} required>
                      <option value="">Select a role...</option>
                      {jobsLoaded && workableJobs.length > 0 ? (
                        workableJobs.map(j=><option key={j.title} value={j.title}>{j.title}</option>)
                      ) : (
                        JOBS.map(j=><option key={j.title} value={j.title}>{j.title}</option>)
                      )}
                      <option value="Open Application">Open Application</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="location">Preferred Location</label>
                    <select id="location">
                      {['New York', 'London', 'US and UK', 'Remote', 'Flexible'].map(l => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field"><label htmlFor="message">Cover Note *</label><textarea id="message" placeholder="Tell us why you want to join Stradit and what you'd bring to the team..." required /></div>
                  <div className="form-field">
                    <label>CV / Resume *</label>
                    <div className="file-upload">
                      <input type="file" id="cv-file" accept=".pdf,.doc,.docx" onChange={e=>setFileName(e.target.files?.[0]?.name||'')} />
                      <div className="file-upload__label">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        {fileName ? <span><b style={{color:'var(--teal)'}}>{fileName}</b></span> : <><span><b>Upload your CV</b></span><small>PDF, DOC or DOCX · max 10MB</small></>}
                      </div>
                    </div>
                  </div>
                  <div className="form-submit">
                    <button type="button" className="btn btn--primary" style={{width:'100%',justifyContent:'center'}} onClick={handleSubmit}>
                      Submit Application<svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  </div>
                  <div className="form-note">Submitting will open your email client to send to <a href="mailto:jobs@stradit.com">jobs@stradit.com</a></div>
                </div>
              ) : (
                <div className="form-success" style={{display:'block'}}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" style={{margin:'0 auto 16px'}}><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
                  <h3>Application sent</h3>
                  <p>We&apos;ll be in touch within 3 business days.<br/>Thank you for your interest in Stradit.</p>
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
