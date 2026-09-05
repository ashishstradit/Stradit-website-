import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import CaseStudySection from '@/components/CaseStudySection'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getServiceSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.coeAi)

const cards = [
  { title:'AI Engineering', desc:'From model designing to deployment, StradIT delivers meticulously formulated frameworks for AI solutions.', items:['Tailored ML and generative AI models','Accelerators and integration toolkits','LLMOps and MLOps foundations'] },
  { title:'Testing & Validation Frameworks', desc:'Enterprise-ready AI solutions delivered through stringent testing and validation.', items:['LLM evaluation frameworks for accuracy, reliability, and scalability','Risk scoring models to surface vulnerabilities and guide mitigation','Guardrails and assurance controls for responsible, policy-aligned AI'] },
  { title:'Business Copilots & Knowledge Systems', desc:'Domain-specific AI copilots and intelligent knowledge systems to embed AI into how teams work.', items:['Tailored AI copilots to address industry-specific challenges','Enterprise knowledge systems powered by fine-tuned LLMs','Knowledge graphs that connect data for smarter decisions'] },
  { title:'Strategic AI Frameworks', desc:'Adopt AI with confidence by aligning every solution to business goals, organizational readiness, and long-term strategy.', items:['Domain value assessment to define where AI will move the needle','AI maturity models to guide adoption from pilot to scale','Use case scoring to prioritize what delivers ROI fastest'] },
  { title:'AI Literacy & Enablement', desc:'AI is as good as the person using it. This is why we go beyond building AI solutions and offer extensive AI literacy and upskilling programs.', items:['AI literacy programs for shared understanding and alignment','Expert-led training across ML, LLMs, generative AI, and governance','Ongoing masterclasses to keep skills sharp as the ecosystem evolves'] },
]

const gradText = { fontStyle:'normal' as const, background:'linear-gradient(120deg,var(--accent),var(--accent-2))', WebkitBackgroundClip:'text' as const, backgroundClip:'text' as const, color:'transparent' as const }

export default function CoeAiPage() {
  return (
    <>
      <JsonLd schema={getServiceSchema({
        name: 'Applied AI Center of Excellence',
        description: 'Build and deploy enterprise LLMs, agentic workflows, intelligent automation, and robust AI governance frameworks with StradIT.',
        url: 'https://stradit.com/coe/ai'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="ai" /></div>
        <div className="container hero__inner">
          <h1 className="hero__title">AI Solutions <em>Center of Excellence</em></h1>
          <p className="hero__sub">Intelligent AI for a Smarter Future</p>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            AI should not live in slides and pilots. It should run inside real workflows. StradIT builds secured, governed, and ready to scale enterprise-grade AI solutions across ML, generative AI, LLMs, guardrails, assurance AI, and maturity models.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Start Your AI Transformation
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe" className="btn btn--ghost">All practices</Link>
          </div>
          <div className="hero__meta hero__meta--three">
            <div className="hero__meta-cell"><div className="hero__meta-v">60%</div><div className="hero__meta-k">Workflow Efficiency Gain</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">4x Faster</div><div className="hero__meta-k">Knowledge Retrieval</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">50% Better</div><div className="hero__meta-k">Time-to-Value</div></div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Inference live · 1.2M tok/s</span>
          <span className="hero__hud-grid"><span>MODELS <b>14</b></span><span>AGENTS <b>62</b></span><span>EVAL PASS <b>97.4%</b></span></span>
          <span>AI · v2026.05</span>
        </div>
      </header>

      {/* APPROACH */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Our Approach</span></div>
          <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px'}}>
            AI Engineered for <em style={gradText}>Real-World Impact</em>
          </h2>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',maxWidth:'680px',marginBottom:'40px'}}>
            StradIT delivers measurable AI outcomes, not experiments. We pair deep engineering with strategic planning so every solution is designed to deploy, adopt, and perform, aligned to your business, risk posture, and operating model.
          </p>
          <div className="ai-approach-grid">
            {cards.map((card,i) => (
              <details key={card.title} className={`text-expand-card reveal reveal-delay-${Math.min(i+1, 5)}`}>
                <summary>
                  <span className="text-expand-card__title">
                    {card.title}
                    <span className="text-expand-card__meta">AI CoE</span>
                  </span>
                </summary>
                <p className="text-expand-card__body">{card.desc}</p>
                <ul className="text-expand-card__list">
                  {card.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </details>
            ))}
          </div>
          <Link href="/contact" className="btn btn--ghost">
            Deploy Smart AI
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>

      {/* CLIENT IMPACT — case study link */}
      <CaseStudySection
        left={
          <div>
            <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>
              AI That&apos;s More Than <em style={gradText}>A Buzzword</em>
            </h2>
            <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'32px',maxWidth:'680px'}}>
              Our Center of Excellence around AI Solutions has helped global enterprises move from &quot;let&apos;s try AI&quot; to &quot;we can&apos;t imagine running this operation without it.&quot;
              Read the full case study to see how purpose-built agents changed the operating model.
            </p>
            <Link href="/contact" className="btn btn--primary">
              Validate AI With Confidence
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        }
        tag="Case Study · Applied AI"
        cardTitle={<>70% Faster Due Diligence with Purpose-Built AI Agents</>}
        cardDesc="How StradIT built a digital AI workforce that cut a 2-week due diligence cycle to 2 minutes — operating 24/7 across 50+ jurisdictions, delivering a 5,000% ROI for a global financial organisation."
        stats={[['70%+','Faster Due Diligence'],['5,000%','ROI'],['24/7','50+ Jurisdictions']]}
        href="/case-studies/ai-agents"
      />

      </main>
      <Footer />
    </>
  )
}
