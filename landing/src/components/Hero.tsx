import React from 'react';
import TenetLogo from './TenetLogo';
import TerminalPanel from './TerminalPanel';

export default function Hero() {
  const handleScrollToDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('download');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      {/* 3-layer background system */}
      <div className="hero-dots hero-enter-bg" />
      <div className="hero-scanlines hero-enter-bg" />
      <div className="hero-glow1 hero-enter-bg" />
      
      <div className="container">
        <div className="hero-inner">
          {/* Left Column */}
          <div>
            {/* Logo above headline with ambient glow */}
            <div className="hero-logo-wrap hero-enter-logo">
              <TenetLogo size={48} />
              <div className="hero-logo-glow" />
            </div>

            {/* Headline with firewall bottom border and cursor */}
            <h1 className="hero-title hero-enter-headline">
              The <span className="grad fw-firewall">Firewall</span> for your AI
              <span className="hero-cursor">|</span>
            </h1>

            <p className="hero-desc hero-enter-sub">
              TENET AI sits between your application and any LLM — detecting prompt injection, jailbreaks, and data extraction in real-time with under 10ms overhead.
            </p>

            <div className="hero-actions hero-enter-cta1">
              <a href="#download" className="btn btn-primary btn-xl" onClick={handleScrollToDownload}>
                Get Started Free
              </a>
              <a 
                href="https://github.com/TENET-DEV-AI/TENET-AI" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline btn-xl hero-enter-cta2"
              >
                View on GitHub
              </a>
            </div>

            {/* Trust pills with check SVG icons */}
            <div className="hero-pills hero-enter-pills">
              {[
                'MIT Licensed',
                'Self-hosted',
                '<10ms overhead',
                'OWASP LLM Top 10'
              ].map((p, i) => (
                <span key={i} className="hero-pill">
                  <svg 
                    className="hero-pill-check" 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    stroke="var(--cyan)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ marginRight: '6px' }}
                  >
                    <polyline points="10 3 4.5 8.5 2 6" />
                  </svg>
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Live Terminal Visualizer */}
          <TerminalPanel />
        </div>
      </div>
    </section>
  );
}
