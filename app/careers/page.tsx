'use client'
import { useState, useRef, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'

/** Reveal stagger classes — matches `Stradit Careers (1).html` job list order */
const JOB_REVEAL_DELAY: (number | null)[] = [null, 1, 2, null, 1, 2, 3, null, 1, 2, 3, null, 1]

export interface JobPosition {
  title: string
  dept: string
  loc: string
  type: string
  desc: string
  applyUrl: string
  postedDate: string
}

const JOBS: JobPosition[] = [
  // Applied AI
  {
    title: 'AI Gateway Engineer',
    dept: 'Applied AI',
    loc: 'Jersey City, NJ · Dallas, TX · Tampa, FL',
    type: 'Full-time · Hybrid',
    desc: 'Design and deploy resilient, high-throughput AI gateways, model orchestration pipelines, and intelligent routing layers with strict latency and security SLAs.',
    applyUrl: 'https://apply.workable.com/j/80B6A81350',
    postedDate: 'Aug 26, 2026',
  },
  {
    title: 'AI Tech Lead - US',
    dept: 'Applied AI',
    loc: 'New York, NY · Jersey City, NJ',
    type: 'Full-time · Hybrid',
    desc: 'Drive enterprise AI solution architecture, governance frameworks, and production-grade LLM engineering for Tier 1 institutional clients.',
    applyUrl: 'https://apply.workable.com/j/571759CE78',
    postedDate: 'Jun 05, 2026',
  },
  {
    title: 'Python Full Stack AI Engineer',
    dept: 'Applied AI',
    loc: 'Pune, Maharashtra',
    type: 'Full-time',
    desc: 'Build intelligent applications and scalable cloud backends, coupling modern frontend frameworks with LLM agents, vector stores, and real-time streaming.',
    applyUrl: 'https://apply.workable.com/j/83DD15F3A2',
    postedDate: 'Jul 09, 2026',
  },

  // Data Analytics
  {
    title: 'Quantitative Analyst',
    dept: 'Data Analytics',
    loc: 'Jersey City, NJ',
    type: 'Full-time · Hybrid',
    desc: 'Develop rigorous statistical, algorithmic, and financial models for capital markets, asset management, and complex quantitative datasets.',
    applyUrl: 'https://apply.workable.com/j/602BD7C7EF',
    postedDate: 'Jul 21, 2026',
  },
  {
    title: 'Quantitative Analyst (Associate / Non-VP)',
    dept: 'Data Analytics',
    loc: 'Jersey City, NJ',
    type: 'Full-time · Hybrid',
    desc: 'Collaborate with quantitative trading and research teams to calibrate pricing models, stress-test simulations, and manage market risk analytics.',
    applyUrl: 'https://apply.workable.com/j/B78A3F363C',
    postedDate: 'Sep 11, 2026',
  },
  {
    title: 'Quantitative Analyst - US',
    dept: 'Data Analytics',
    loc: 'Jersey City, NJ',
    type: 'Full-time · Hybrid',
    desc: 'Lead data analysis, statistical research, and quantitative pipeline development for institutional clients across our US practice.',
    applyUrl: 'https://apply.workable.com/j/7E6B0C1709',
    postedDate: 'Jun 15, 2026',
  },
  {
    title: 'Automation Test Engineer - Data Analytics and Reporting',
    dept: 'Data Analytics',
    loc: 'Hyderabad · Chennai, India',
    type: 'Full-time',
    desc: 'Deliver automated verification, schema testing, and data validation for enterprise BI reporting and modern cloud data warehouses.',
    applyUrl: 'https://apply.workable.com/j/C8BCED68FF',
    postedDate: 'Sep 03, 2026',
  },

  // Cyber Security
  {
    title: 'Network Penetration Testing Specialist',
    dept: 'Cyber Security',
    loc: 'Dallas, TX · Tampa, FL · Jersey City, NJ',
    type: 'Full-time · Hybrid',
    desc: 'Conduct red-teaming, external/internal network penetration testing, adversarial vulnerability research, and comprehensive threat assessments.',
    applyUrl: 'https://apply.workable.com/j/013576050F',
    postedDate: 'Sep 28, 2026',
  },
  {
    title: 'Cybersecurity Risk Analyst',
    dept: 'Cyber Security',
    loc: 'Dallas, TX · Tampa, FL',
    type: 'Full-time · Hybrid',
    desc: 'Assess and monitor institutional security risk, compliance postures against NIST/ISO/SOC2, and third-party risk across critical enterprise ecosystems.',
    applyUrl: 'https://apply.workable.com/j/6A4E937CFF',
    postedDate: 'Aug 18, 2026',
  },
  {
    title: 'IT Risk & Control Specialist',
    dept: 'Cyber Security',
    loc: 'Hyderabad, Telangana',
    type: 'Full-time',
    desc: 'Design, audit, and evaluate IT general controls, risk governance processes, and regulatory readiness for mission-critical client infrastructure.',
    applyUrl: 'https://apply.workable.com/j/37F1D50283',
    postedDate: 'Sep 15, 2026',
  },

  // Cloud
  {
    title: 'Grafana & Observability Engineer',
    dept: 'Cloud',
    loc: 'Jersey City, NJ · Dallas, TX · Tampa, FL',
    type: 'Full-time · Hybrid',
    desc: 'Architect centralized observability platforms using Grafana, Prometheus, OpenTelemetry, and distributed tracing across hybrid cloud environments.',
    applyUrl: 'https://apply.workable.com/j/217670E022',
    postedDate: 'Aug 20, 2026',
  },
  {
    title: 'Lead Middleware Infrastructure Engineer',
    dept: 'Cloud',
    loc: 'Dallas, TX',
    type: 'Full-time',
    desc: 'Own enterprise message brokers, WebSphere/MQ systems, application servers, and automated infrastructure provisioning for core banking systems.',
    applyUrl: 'https://apply.workable.com/j/D20BBB1851',
    postedDate: 'Jul 06, 2026',
  },
  {
    title: 'Mainframe Capacity Planning Engineer - US',
    dept: 'Cloud',
    loc: 'Jersey City, NJ · Tampa, FL · Dallas, TX · Boston, MA',
    type: 'Full-time · Hybrid',
    desc: 'Lead workload forecasting, performance optimization, and capacity analytics across large-scale IBM z/OS mainframe environments.',
    applyUrl: 'https://apply.workable.com/j/906D9D6EED',
    postedDate: 'Aug 25, 2026',
  },
  {
    title: 'OCP Engineer',
    dept: 'Cloud',
    loc: 'Jersey City, NJ',
    type: 'Full-time · Hybrid',
    desc: 'Deploy, automate, and harden Red Hat OpenShift Container Platform (OCP) clusters, container runtimes, and CI/CD gitops pipelines.',
    applyUrl: 'https://apply.workable.com/j/2EAEA79EB2',
    postedDate: 'Aug 06, 2026',
  },
  {
    title: 'Java Full Stack Developer',
    dept: 'Cloud',
    loc: 'Dallas, TX · Jersey City, NJ · Tampa, FL',
    type: 'Full-time · Hybrid',
    desc: 'Build resilient microservices with Spring Boot, Java, and modern frontend frameworks for mission-critical financial client platforms.',
    applyUrl: 'https://apply.workable.com/j/00321E459C',
    postedDate: 'Jun 23, 2026',
  },
  {
    title: 'Python Developer',
    dept: 'Cloud',
    loc: 'Jersey City, NJ · Dallas, TX · Tampa, FL · Boston, MA',
    type: 'Full-time · Hybrid',
    desc: 'Engineered high-throughput backend services, data pipelines, asynchronous architectures, and REST/gRPC APIs in modern Python.',
    applyUrl: 'https://apply.workable.com/j/D3E3509AF9',
    postedDate: 'Aug 05, 2026',
  },
  {
    title: 'SAP Basis Admin',
    dept: 'Cloud',
    loc: 'New York, NY · Jersey City, NJ',
    type: 'Full-time · Hybrid',
    desc: 'Manage SAP system installations, upgrades, transport management, database performance tuning, and cloud migrations.',
    applyUrl: 'https://apply.workable.com/j/56CE90117D',
    postedDate: 'Aug 31, 2026',
  },
  {
    title: 'Blockchain - USA',
    dept: 'Cloud',
    loc: 'New York, NY',
    type: 'Full-time · Hybrid',
    desc: 'Design and deploy smart contracts, tokenomics structures, and secure distributed ledger integrations for financial market institutions.',
    applyUrl: 'https://apply.workable.com/j/3C4F64E8D8',
    postedDate: 'Jun 23, 2026',
  },
  {
    title: 'Blockchain - India',
    dept: 'Cloud',
    loc: 'Pune, Maharashtra',
    type: 'Full-time',
    desc: 'Develop decentralized protocol logic, consensus interfaces, and Web3 infrastructure solutions with deep cryptography focus.',
    applyUrl: 'https://apply.workable.com/j/45C8BD2106',
    postedDate: 'Jun 24, 2026',
  },

  // QA Engineering
  {
    title: 'QA Automation Engineers / SDET / Test Architect',
    dept: 'QA Engineering',
    loc: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    desc: 'Architect test automation frameworks from scratch, drive end-to-end API/UI automation, and establish robust test architectures in CI/CD.',
    applyUrl: 'https://apply.workable.com/j/1F37F60EF2',
    postedDate: 'Aug 14, 2026',
  },
  {
    title: 'SDET (3 to 6 Years of experience)',
    dept: 'QA Engineering',
    loc: 'Jersey City, NJ · Dallas, TX',
    type: 'Full-time · Hybrid',
    desc: 'Write automated regression suites, integration tests, and performance validation scripts for enterprise financial software.',
    applyUrl: 'https://apply.workable.com/j/E12A1F197A',
    postedDate: 'Aug 20, 2026',
  },
  {
    title: 'SDET - US (W2 Employment, Visa Independent)',
    dept: 'QA Engineering',
    loc: 'Tampa, FL · US Nationwide',
    type: 'Full-time · W2',
    desc: 'Lead automated testing pipelines for regulated enterprise systems. Open to GC, USC, and Visa-independent candidates.',
    applyUrl: 'https://apply.workable.com/j/2845DFAA0F',
    postedDate: 'Jul 17, 2026',
  },

  // Strategy, Operations & Growth
  {
    title: 'Associate Director',
    dept: 'Strategy',
    loc: 'Jersey City, NJ · Tampa, FL',
    type: 'Full-time · Hybrid',
    desc: 'Lead strategic enterprise client engagements, manage cross-functional delivery practices, and oversee digital transformation outcomes.',
    applyUrl: 'https://apply.workable.com/j/0A0F292BA9',
    postedDate: 'Sep 03, 2026',
  },
  {
    title: 'Scrum Master',
    dept: 'Strategy',
    loc: 'Dallas, TX · Tampa, FL',
    type: 'Full-time · Hybrid',
    desc: 'Facilitate agile delivery teams, sprint ceremonies, backlog grooming, and remove blockers to maximize engineering velocity.',
    applyUrl: 'https://apply.workable.com/j/A0681011E1',
    postedDate: 'Aug 12, 2026',
  },
  {
    title: 'IT Strategic Sourcing (Sr Associate)',
    dept: 'Strategy',
    loc: 'Jersey City, NJ · Tampa, FL',
    type: 'Full-time · Hybrid',
    desc: 'Drive procurement operations, vendor evaluations, MSA/SOW contract negotiations, and strategic technology sourcing strategies.',
    applyUrl: 'https://apply.workable.com/j/A6AFEA50CE',
    postedDate: 'Sep 03, 2026',
  },
  {
    title: 'IT Sourcer',
    dept: 'Strategy',
    loc: 'Tampa, FL · Dallas, TX',
    type: 'Full-time · Hybrid',
    desc: 'Identify and engage high-caliber engineering talent across AI, Cloud, Cybersecurity, and Data through strategic sourcing pipelines.',
    applyUrl: 'https://apply.workable.com/j/6D23422A24',
    postedDate: 'Jul 21, 2026',
  },
  {
    title: 'Employee Onboarding Specialist',
    dept: 'Strategy',
    loc: 'Tampa, FL · Jersey City, NJ · Dallas, TX',
    type: 'Full-time · Hybrid',
    desc: 'Deliver seamless, high-touch onboarding journeys for new team members across US hubs, managing compliance and provisioning.',
    applyUrl: 'https://apply.workable.com/j/7AA6C39F33',
    postedDate: 'Aug 13, 2026',
  },
  {
    title: 'Background Check Specialist',
    dept: 'Strategy',
    loc: 'Tampa, FL',
    type: 'Full-time · Hybrid',
    desc: 'Coordinate and verify comprehensive background screening and security clearances for personnel placed with regulated financial institutions.',
    applyUrl: 'https://apply.workable.com/j/C764C4CFFE',
    postedDate: 'Aug 05, 2026',
  },
  {
    title: 'External Workforce Procurement Administrator',
    dept: 'Strategy',
    loc: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    desc: 'Manage vendor management systems (VMS), contractor timesheets, onboarding compliance, and procurement admin workflows.',
    applyUrl: 'https://apply.workable.com/j/75A7815E1A',
    postedDate: 'Sep 16, 2026',
  },
  {
    title: 'BDR / SDR / Account Managers',
    dept: 'Strategy',
    loc: 'New York, NY',
    type: 'Full-time · Hybrid',
    desc: 'Drive revenue expansion, qualify enterprise leads, and build relationships with technical decision-makers.',
    applyUrl: 'https://apply.workable.com/j/07A55332B5',
    postedDate: 'Jun 13, 2026',
  },
  {
    title: 'Jr. BDR/SDR',
    dept: 'Strategy',
    loc: 'New York, NY',
    type: 'Full-time · Hybrid',
    desc: 'Accelerate outbound prospecting, research target institutional accounts, and generate qualified meetings for sales leadership.',
    applyUrl: 'https://apply.workable.com/j/7832D634DB',
    postedDate: 'Jul 13, 2026',
  },
]

const FILTERS = ['All roles', 'Applied AI', 'Data Analytics', 'Cyber Security', 'Cloud', 'QA Engineering', 'Strategy']
const FILTER_TO_DEPT: Record<string, string> = { 'Applied AI': 'Applied AI', 'Data Analytics': 'Data Analytics', 'Cyber Security': 'Cyber Security', 'Cloud': 'Cloud', 'QA Engineering': 'QA Engineering', 'Strategy': 'Strategy' }
const DEPT_LABEL: Record<string, string> = { 'Applied AI': 'Applied AI', 'Data Analytics': 'Data Analytics', 'Cyber Security': 'Cyber Security', 'Cloud': 'Cloud', 'QA Engineering': 'QA Engineering', 'Strategy': 'Strategy' }

export default function CareersPage() {
  const [activeFilter, setActiveFilter] = useState('All roles')
  const [selectedRole, setSelectedRole] = useState('')
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [jobsLoaded, setJobsLoaded] = useState(false)
  const [workableJobs, setWorkableJobs] = useState<{ title: string; dept: string }[]>([])
  const applyRef = useRef<HTMLElement>(null)

  const filteredJobs = JOBS.filter(job => {
    if (activeFilter === 'All roles') return true
    return job.dept.toLowerCase() === activeFilter.toLowerCase()
  })

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
                {jobsLoaded ? workableJobs.length : 77} <span className="careers-hero-stats__sub">across 5 practices</span>
              </div>
            </div>
            <div className="careers-hero-stats__item">
              <div className="careers-hero-stats__k">Remote</div>
              <div className="careers-hero-stats__v">Hybrid <span className="careers-hero-stats__sub">flexible by design</span></div>
            </div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Hiring live · {jobsLoaded ? workableJobs.length : 77} open roles</span>
          <span className="hero__hud-grid">
            <span>HUBS <b>5</b></span><span>OPEN ROLES <b>{jobsLoaded ? workableJobs.length : 77}</b></span><span>PRACTICES <b>5</b></span>
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
              {jobsLoaded ? `${workableJobs.length} open roles` : '77 open roles'} across our global <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>practices.</em>
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
            <div className="jobs-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredJobs.length === 0 ? (
                <div style={{ padding: '36px', textAlign: 'center', background: 'var(--ink-1)', border: '1px solid var(--line)', borderRadius: '12px' }}>
                  <p style={{ color: 'var(--text-1)', fontSize: '16px', marginBottom: '8px' }}>No direct openings found for this category right now.</p>
                  <p style={{ color: 'var(--text-2)', fontSize: '13px' }}>Feel free to submit an open application below.</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div key={job.title} className="job-card">
                    <div className="job-card__left">
                      <div className="job-card__title">{job.title}</div>
                      <div className="job-card__meta">
                        <span className="job-card__tag job-card__tag--dept">{job.dept}</span>
                        <span className="job-card__tag job-card__tag--loc">📍 {job.loc}</span>
                        <span className="job-card__tag">{job.type}</span>
                        {job.postedDate && (
                          <span className="job-card__tag" style={{ opacity: 0.8 }}>Posted: {job.postedDate}</span>
                        )}
                      </div>
                      <div className="job-card__desc">{job.desc}</div>
                    </div>
                    <div className="job-card__right" style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {job.applyUrl && (
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="job-card__apply"
                          title="Apply on Workable"
                        >
                          Apply Now
                        </a>
                      )}
                      <button
                        type="button"
                        className="btn btn--ghost"
                        style={{ padding: '8px 14px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                        onClick={() => {
                          setSelectedRole(job.title)
                          applyRef.current?.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        Quick Apply
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div id="whr_embed_hook" style={{ display: 'none' }}></div>
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
                      {JOBS.map(j=><option key={j.title} value={j.title}>{j.title}</option>)}
                      <option value="Open Application">Open Application</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="location">Preferred Location</label>
                    <select id="location">
                      {['Jersey City, NJ', 'Dallas, TX', 'Tampa, FL', 'New York, NY', 'Boston, MA', 'Hyderabad, India', 'Chennai, India', 'Pune, India', 'Remote / Flexible'].map(l => (
                        <option key={l} value={l}>{l}</option>
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
