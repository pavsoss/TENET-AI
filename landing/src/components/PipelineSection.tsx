import React, { useState, useEffect, useRef } from 'react';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.05 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.5s ${delay}s ease-out, transform 0.5s ${delay}s ease-out`
      }}
    >
      {children}
    </div>
  );
}

export default function PipelineSection() {
  const [packetState, setPacketState] = useState<'allow' | 'block'>('allow');

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketState(prev => (prev === 'allow' ? 'block' : 'allow'));
    }, 3000); // Toggle packet type every 3s to match the loop
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section" id="pipeline" aria-label="Pipeline Architecture">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes packetTravelAllow {
          0% { left: 5%; opacity: 1; background: var(--cyan); }
          30% { left: 30%; opacity: 1; background: var(--cyan); }
          60% { left: 60%; opacity: 1; background: var(--cyan); }
          90% { left: 95%; opacity: 1; background: var(--green); }
          100% { left: 95%; opacity: 0; background: var(--green); }
        }
        @keyframes packetTravelBlock {
          0% { left: 5%; opacity: 1; background: var(--cyan); }
          30% { left: 30%; opacity: 1; background: var(--cyan); }
          60% { left: 60%; opacity: 1; background: var(--cyan); }
          90% { left: 95%; opacity: 1; background: var(--red); }
          100% { left: 95%; opacity: 0; background: var(--red); }
        }
        .pipeline-packet-active {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          box-shadow: 0 0 8px currentColor;
        }
      `}} />

      <div className="container">
        <FadeUp>
          <div style={{ marginBottom: 48 }}>
            <div className="eyebrow">Architecture</div>
            <h2 className="section-title">How TENET AI <span className="grad">intercepts threats</span></h2>
            <p className="section-sub">Four-stage pipeline adding &lt;10ms to every LLM request — invisible to users, visible to security teams.</p>
          </div>
        </FadeUp>

        {/* Pipeline Diagram */}
        <FadeUp delay={0.1}>
          <div className="pipeline-flow" style={{ position: 'relative', overflow: 'hidden', padding: '30px 10px', background: 'rgba(255,255,255,0.01)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            
            {/* Travelling Packet */}
            <div 
              className="pipeline-packet-active"
              style={{
                color: packetState === 'allow' ? 'var(--green)' : 'var(--red)',
                animation: packetState === 'allow' 
                  ? 'packetTravelAllow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite' 
                  : 'packetTravelBlock 3s cubic-bezier(0.4, 0, 0.2, 1) infinite'
              }}
            />

            <div className="pipeline-flow-node node-app">Your Application</div>
            <div className="pipeline-flow-arrow" />
            <div className="pipeline-flow-node node-tenet">TENET Middleware</div>
            <div className="pipeline-flow-arrow" />
            <div className="pipeline-flow-node node-engine">Analysis Engines</div>
            <div className="pipeline-flow-arrow" />
            
            {/* Split destination */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 1 }}>
              <div className="pipeline-flow-node node-allow" style={{ opacity: packetState === 'allow' ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                ALLOW (LLM)
              </div>
              <div className="pipeline-flow-node node-block" style={{ opacity: packetState === 'block' ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                BLOCK (403)
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Step Cards */}
        <FadeUp delay={0.2}>
          <div className="how-grid">
            <div className="how-line" />
            
            {[
              {
                num: '01',
                n: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
                tag: 'STEP 1',
                title: 'Intercept',
                desc: 'Middleware captures all outbound prompts before they reach any LLM API endpoint.'
              },
              {
                num: '02',
                n: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
                tag: 'STEP 2',
                title: 'Analyze',
                desc: 'Heuristic rules, ML classifier, and behavioral engine run in parallel for full-spectrum coverage.',
                showRiskBar: true
              },
              {
                num: '03',
                n: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                tag: 'STEP 3',
                title: 'Decide',
                desc: 'Policy engine issues a verdict — Block / Sanitize / Flag / Allow — within the 10ms budget.'
              },
              {
                num: '04',
                n: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
                tag: 'STEP 4',
                title: 'Learn',
                desc: 'Analyst feedback and shared threat intelligence continuously improve detection accuracy.'
              }
            ].map((s, i) => (
              <div key={i} className="how-step">
                <span className="how-step-number">{s.num}</span>
                <div className="how-num" style={{ color: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.n}
                </div>
                <div className="how-tag">{s.tag}</div>
                <div className="how-title">{s.title}</div>
                <div className="how-desc">{s.desc}</div>

                {s.showRiskBar && (
                  <div className="risk-score-bar">
                    <div className="risk-score-track">
                      <div className="risk-score-fill" />
                    </div>
                    <div className="risk-score-label">Risk score: 87%</div>
                  </div>
                )}
              </div>
            ))}

          </div>
        </FadeUp>
      </div>
    </section>
  );
}
