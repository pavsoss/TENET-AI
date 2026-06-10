import React, { useState, useEffect, useRef } from 'react';

interface InstallItem {
  icon: React.ReactNode;
  plat: string;
  title: string;
  sub: string;
  cmd: string;
  feats: string[];
}

const INSTALLS: InstallItem[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c5.522 0 10 2.2 10 4.9v9.2c0 2.7-4.478 4.9-10 4.9s-10-2.2-10-4.9V6.9C2 4.2 6.478 2 12 2z" />
        <path d="M22 6.9c0 2.7-4.478 4.9-10 4.9S2 9.6 2 6.9" />
        <path d="M2 11.5c0 2.7 4.478 4.9 10 4.9s10-2.2 10-4.9" />
      </svg>
    ),
    plat: 'Python',
    title: 'Python SDK',
    sub: 'Async-first middleware for Python apps',
    cmd: 'pip install tenet-ai',
    feats: ['FastAPI / Django / Flask', 'LangChain & LlamaIndex', 'Full async/await support', 'Complete type hints']
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21 16 12 21 3 16 3 8 12 3 21 8 21 16" />
        <polyline points="3 8 12 13 21 8" />
        <line x1="12" y1="13" x2="12" y2="21" />
      </svg>
    ),
    plat: 'Node.js',
    title: 'Node.js Package',
    sub: 'TypeScript-native NPM package',
    cmd: 'npm install @tenet-ai/sdk',
    feats: ['Express / Next.js middleware', 'Cloudflare Workers support', 'TypeScript out of the box', 'Edge runtime compatible']
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="10" width="20" height="8" rx="2" />
        <line x1="6" y1="10" x2="6" y2="18" />
        <line x1="10" y1="10" x2="10" y2="18" />
        <line x1="14" y1="10" x2="14" y2="18" />
        <line x1="18" y1="10" x2="18" y2="18" />
        <path d="M6 6h4v4H6z" fill="currentColor" opacity="0.3" />
        <path d="M14 6h4v4h-4z" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    plat: 'Docker',
    title: 'Docker Image',
    sub: 'Self-hosted REST API + SOC dashboard',
    cmd: 'docker pull tenetai/core',
    feats: ['One-command deployment', 'SOC dashboard included', 'Prometheus + Grafana ready', 'PostgreSQL + Redis bundled']
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    plat: 'Cloud',
    title: 'Cloud Templates',
    sub: 'Infrastructure-as-code for all major clouds',
    cmd: 'helm install tenet-ai ./chart',
    feats: ['AWS Lambda layer', 'Azure Functions extension', 'GCP Cloud Run template', 'Kubernetes Helm chart']
  }
];

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

export default function InstallSection() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section className="section section-alt" id="download" aria-label="Installation Instructions">
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow">Get Started</div>
            <h2 className="section-title">Install in <span className="grad">minutes</span></h2>
            <p className="section-sub">One additional API call. Zero changes to your existing LLM integration code.</p>
          </div>
        </FadeUp>

        <div className="install-grid" style={{ marginBottom: 32 }}>
          {INSTALLS.map((d, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="install-card">
                <div className="install-head">
                  <div>
                    <div className="install-icon" style={{ color: 'var(--cyan)' }} aria-hidden="true">
                      {d.icon}
                    </div>
                    <div className="install-title" style={{ marginTop: '8px' }}>{d.title}</div>
                    <div className="install-sub">{d.sub}</div>
                  </div>
                  <span className="install-plat">{d.plat}</span>
                </div>
                <div 
                  className="install-cmd" 
                  onClick={() => handleCopy(d.cmd)}
                  style={{ cursor: 'pointer' }}
                  title="Click to copy command"
                >
                  <span className="install-prompt">$</span>
                  <span style={{ flex: 1 }}>{d.cmd}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                    {copiedCmd === d.cmd ? 'Copied' : 'Copy'}
                  </span>
                </div>
                <div className="install-body">
                  <div className="install-features">
                    {d.feats.map((f, j) => (
                      <div key={j} className="install-feat">{f}</div>
                    ))}
                  </div>
                  <a 
                    href="https://github.com/TENET-DEV-AI/TENET-AI" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-outline btn-sm" 
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Download Source
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Integration Code Block Example */}
        <FadeUp delay={0.2}>
          <div className="code-block">
            <div className="code-head">
              <div className="code-dot2" style={{ background: 'var(--red)' }} />
              <div className="code-dot2" style={{ background: 'var(--amber)' }} />
              <div className="code-dot2" style={{ background: 'var(--green)' }} />
              <span className="code-file">integration_example.py</span>
              <span className="code-lang-badge">Python</span>
            </div>
            <pre className="code-body" style={{ margin: 0, overflowX: 'auto' }}>
              <code style={{ fontFamily: 'var(--mono)' }}>
                <span className="cc"># 1. Install SDK package</span>{'\n'}
                <span className="ck">import</span> <span className="cy">tenet_ai</span>{'\n\n'}
                <span className="cc"># 2. Initialize the client</span>{'\n'}
                <span>tenet</span> = tenet_ai.<span className="cf">Client</span>(<span>api_key</span>=<span className="cs">"your-key"</span>){'\n\n'}
                <span className="cc"># 3. Intercept user prompts before LLM dispatch</span>{'\n'}
                <span>result</span> = tenet.<span className="cf">check</span>(<span>prompt</span>=user_input, <span>user_id</span>=<span className="cs">"u-123"</span>){'\n\n'}
                <span className="ck">if</span> <span>result</span>.blocked:{'\n'}
                {'    '}<span className="ck">return</span> <span className="cs">"Access Blocked: Malicious payload detected."</span>  <span className="cc"># &lt;5ms overhead</span>{'\n\n'}
                <span className="cc"># 4. Prompt is safe — dispatch normally to provider</span>{'\n'}
                <span>response</span> = openai.<span className="cf">chat</span>(user_input)     <span className="cc"># Works with OpenAI</span>{'\n'}
                <span>response</span> = anthropic.<span className="cf">message</span>(user_input)  <span className="cc"># Anthropic Claude</span>{'\n'}
                <span>response</span> = ollama.<span className="cf">generate</span>(user_input)   <span className="cc"># Local Ollama</span>
              </code>
            </pre>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
