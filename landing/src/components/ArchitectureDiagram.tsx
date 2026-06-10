import React, { useEffect, useState, useRef } from 'react';

export default function ArchitectureDiagram() {
  const [cycle, setCycle] = useState(0); // 0 = allow, 1 = allow, 2 = block
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle(prev => (prev + 1) % 3);
    }, 4000); // 4 seconds cycle

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="section section-alt" id="architecture" aria-label="System Architecture">
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow">System Topology</div>
          <h2 className="section-title">Decentralized, high-performance <span className="grad">middleware topology</span></h2>
          <p className="section-sub">TENET AI coordinates safety actions directly inside your cluster using parallel detection engines.</p>
        </div>

        <div className="arch-svg-wrap" ref={ref}>
          <svg className="arch-svg" viewBox="0 0 820 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--border2)" />
              </marker>
              
              <linearGradient id="glow-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--cyan)" />
                <stop offset="100%" stopColor="#0088aa" />
              </linearGradient>
              <linearGradient id="glow-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--purple)" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>

              {/* Animated dasharray definitions */}
              <style dangerouslySetInnerHTML={{ __html: `
                .anim-path {
                  stroke: var(--border2);
                  stroke-width: 1.5;
                  stroke-dasharray: 6 4;
                  animation: dash 30s linear infinite;
                }
                .anim-path-active {
                  stroke: var(--cyan);
                  stroke-width: 2;
                  filter: drop-shadow(0 0 2px var(--cyan));
                }
                @keyframes dash {
                  to {
                    stroke-dashoffset: -1000;
                  }
                }
                .arch-node {
                  transition: all 0.3s;
                }
                .arch-node:hover {
                  filter: drop-shadow(0 0 4px var(--cyan));
                  stroke: var(--cyan)!important;
                }
              `}} />
            </defs>

            {/* Background grids inside SVG */}
            <g opacity="0.05">
              <path d="M 0 40 H 820 M 0 80 H 820 M 0 120 H 820 M 0 160 H 820 M 0 200 H 820 M 0 240 H 820 M 0 280 H 820 M 0 320 H 820" stroke="var(--text)" strokeWidth="1" />
              <path d="M 80 0 V 360 M 160 0 V 360 M 240 0 V 360 M 320 0 V 360 M 400 0 V 360 M 480 0 V 360 M 560 0 V 360 M 640 0 V 360 M 720 0 V 360" stroke="var(--text)" strokeWidth="1" />
            </g>

            {/* Connecting Paths */}
            {/* App to Middleware */}
            <path d="M 150 180 H 210" className="anim-path" markerEnd="url(#arrow)" />
            
            {/* Middleware to 3 Engines */}
            <path d="M 360 180 H 380 V 100 H 410" className="anim-path" markerEnd="url(#arrow)" />
            <path d="M 360 180 H 410" className="anim-path" markerEnd="url(#arrow)" />
            <path d="M 360 180 H 380 V 260 H 410" className="anim-path" markerEnd="url(#arrow)" />

            {/* Engines to Decision Point */}
            <path d="M 540 100 H 570 V 180 H 600" className="anim-path" markerEnd="url(#arrow)" />
            <path d="M 540 180 H 600" className="anim-path" markerEnd="url(#arrow)" />
            <path d="M 540 260 H 570 V 180 H 600" className="anim-path" markerEnd="url(#arrow)" />

            {/* Decision to Outlets */}
            <path d="M 680 180 H 710" className="anim-path" markerEnd="url(#arrow)" />

            {/* Animated Packet Circle */}
            {inView && (
              <g>
                <circle r="5" fill={cycle === 2 ? 'var(--red)' : 'var(--cyan)'} style={{ filter: `drop-shadow(0 0 4px ${cycle === 2 ? 'var(--red)' : 'var(--cyan)'})` }}>
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    path={
                      cycle === 2
                        ? "M 150 180 H 210 M 210 180 H 360 M 360 180 H 380 V 100 H 410 M 410 100 H 540 M 540 100 H 570 V 180 H 600 M 600 180 H 680 M 680 180 H 710" // block path triggers heuristic block
                        : "M 150 180 H 210 M 210 180 H 360 M 360 180 H 410 M 410 180 H 540 M 540 180 H 600 M 600 180 H 680 M 680 180 H 710" // allow path
                    }
                  />
                </circle>
              </g>
            )}

            {/* BOX 1: Application Node */}
            <g className="arch-node">
              <rect x="30" y="140" width="120" height="80" rx="8" fill="var(--surface2)" stroke="var(--border)" strokeWidth="1.5" />
              <text x="90" y="175" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">Your App</text>
              <text x="90" y="195" textAnchor="middle" fill="var(--text3)" fontSize="10">Python / Node.js</text>
            </g>

            {/* BOX 2: TENET Middleware */}
            <g className="arch-node">
              <rect x="210" y="130" width="150" height="100" rx="8" fill="var(--surface2)" stroke="url(#glow-cyan)" strokeWidth="1.5" />
              <text x="285" y="170" textAnchor="middle" fill="var(--cyan)" fontSize="13" fontWeight="700">TENET SDK</text>
              <text x="285" y="190" textAnchor="middle" fill="var(--text2)" fontSize="11">Core Proxy Layer</text>
              
              {/* <10ms latency badge */}
              <rect x="250" y="205" width="70" height="16" rx="4" fill="var(--cyan-dim)" stroke="rgba(0,229,255,0.2)" />
              <text x="285" y="217" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontWeight="600">&lt;10ms latency</text>
            </g>

            {/* BOXES 3: Parallel Detection Engines */}
            {/* 3a: Heuristics */}
            <g className="arch-node">
              <rect x="410" y="70" width="130" height="60" rx="8" fill="var(--surface2)" stroke="var(--border)" strokeWidth="1.5" />
              <text x="475" y="100" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">Heuristics Engine</text>
              <text x="475" y="115" textAnchor="middle" fill="var(--text3)" fontSize="9.5">Known signatures</text>
            </g>
            {/* 3b: ML Classifier */}
            <g className="arch-node">
              <rect x="410" y="150" width="130" height="60" rx="8" fill="var(--surface2)" stroke="url(#glow-purple)" strokeWidth="1.5" />
              <text x="475" y="180" textAnchor="middle" fill="var(--purple)" fontSize="12" fontWeight="600">ML Classifier</text>
              <text x="475" y="195" textAnchor="middle" fill="var(--text3)" fontSize="9.5">Adversarial matching</text>
            </g>
            {/* 3c: Behavioral Analyzer */}
            <g className="arch-node">
              <rect x="410" y="230" width="130" height="60" rx="8" fill="var(--surface2)" stroke="var(--border)" strokeWidth="1.5" />
              <text x="475" y="260" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">Behavioral tracker</text>
              <text x="475" y="275" textAnchor="middle" fill="var(--text3)" fontSize="9.5">Cross-session chains</text>
            </g>

            {/* BOX 4: Decision Node (Diamond / Hexagon visual look) */}
            <g className="arch-node">
              <rect x="600" y="140" width="80" height="80" rx="8" fill="var(--surface2)" stroke="var(--border)" strokeWidth="1.5" transform="rotate(45 640 180)" />
              <text x="640" y="184" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="700">Policy</text>
            </g>

            {/* BOX 5: Outcomes */}
            {/* Block Output */}
            <g style={{ opacity: cycle === 2 ? 1 : 0.4, transition: 'opacity 0.3s' }}>
              <rect x="710" y="100" width="80" height="50" rx="8" fill="rgba(255,59,59,0.06)" stroke="var(--red)" strokeWidth="1.5" />
              <text x="750" y="125" textAnchor="middle" fill="var(--red)" fontSize="12" fontWeight="700">BLOCK (403)</text>
              <text x="750" y="138" textAnchor="middle" fill="var(--text3)" fontSize="9">Heuristic block</text>
            </g>
            
            {/* Allowed/LLM Output */}
            <g style={{ opacity: cycle !== 2 ? 1 : 0.4, transition: 'opacity 0.3s' }}>
              <rect x="710" y="210" width="80" height="50" rx="8" fill="rgba(0,255,136,0.06)" stroke="var(--green)" strokeWidth="1.5" />
              <text x="750" y="235" textAnchor="middle" fill="var(--green)" fontSize="12" fontWeight="700">ALLOW</text>
              <text x="750" y="248" textAnchor="middle" fill="var(--text3)" fontSize="9">Forward to LLM</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
