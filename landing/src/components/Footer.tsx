import React, { useState, useEffect } from 'react';
import TenetLogo from './TenetLogo';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAnnouncement('Scrolled back to top of the page.');
    setTimeout(() => setAnnouncement(''), 1000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" aria-label="Page Footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand block */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <TenetLogo size={24} />
              <span className="footer-name">TENET AI</span>
            </div>
            <p className="footer-brand-desc">
              Next-generation open-source LLM security middleware. Secure your agent pipelines, applications, and APIs in production.
            </p>
          </div>

          {/* Product links */}
          <div>
            <div className="footer-col-title">Product</div>
            <div className="footer-col-links">
              <a href="#home" className="footer-link" onClick={(e) => handleLinkClick(e, 'home')}>Dashboard</a>
              <a href="#features" className="footer-link" onClick={(e) => handleLinkClick(e, 'features')}>Features</a>
              <a href="#compare" className="footer-link" onClick={(e) => handleLinkClick(e, 'compare')}>Comparison</a>
              <a href="#download" className="footer-link" onClick={(e) => handleLinkClick(e, 'download')}>Download SDK</a>
            </div>
          </div>

          {/* Community links */}
          <div>
            <div className="footer-col-title">Community</div>
            <div className="footer-col-links">
              <a href="https://github.com/TENET-DEV-AI/TENET-AI" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              <a href="https://discord.gg/" target="_blank" rel="noreferrer" className="footer-link">Discord Server</a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="footer-link">Twitter / X</a>
              <a href="https://github.com/TENET-DEV-AI/TENET-AI/issues" target="_blank" rel="noreferrer" className="footer-link">Issue Tracker</a>
            </div>
          </div>

          {/* Legal links */}
          <div>
            <div className="footer-col-title">Legal</div>
            <div className="footer-col-links">
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/terms" className="footer-link">Terms of Service</a>
              <a href="/license" className="footer-link">MIT License</a>
              <a href="mailto:security@tenet.ai" className="footer-link">Security Audits</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} TENET AI. Built for the developer community.
          </div>
          <a href="#home" className="footer-secured" onClick={(e) => handleLinkClick(e, 'home')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--cyan)' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Protected by TENET AI Core
          </a>
        </div>
      </div>

      {/* Back to top button with screen-reader announcement */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top of the page"
        title="Scroll to top"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* SR announcement for accessibility */}
      <div className="sr-only" aria-live="polite" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
        {announcement}
      </div>
    </footer>
  );
}
