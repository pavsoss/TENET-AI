import React from 'react';

interface RowData {
  capability: string;
  keyword: 'yes' | 'no' | 'partial';
  ruleBased: 'yes' | 'no' | 'partial';
  tenet: 'yes' | 'no' | 'partial';
}

const ROWS: RowData[] = [
  { capability: 'Zero-latency Heuristic Scans', keyword: 'yes', ruleBased: 'yes', tenet: 'yes' },
  { capability: 'Context-aware ML Signature Scan', keyword: 'no', ruleBased: 'no', tenet: 'yes' },
  { capability: 'Multi-session Jailbreak Tracking', keyword: 'no', ruleBased: 'partial', tenet: 'yes' },
  { capability: 'Adaptive Self-learning Classification', keyword: 'no', ruleBased: 'no', tenet: 'yes' },
  { capability: 'Dynamic Payload Sanitization', keyword: 'partial', ruleBased: 'partial', tenet: 'yes' },
  { capability: 'Cross-LLM Portability', keyword: 'no', ruleBased: 'yes', tenet: 'yes' }
];

export default function ComparisonTable() {
  const renderIcon = (val: 'yes' | 'no' | 'partial') => {
    if (val === 'yes') {
      return (
        <span className="compare-icon-yes" aria-label="Fully Supported" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10 3 4.5 8.5 2 6" />
          </svg>
          <span style={{ fontSize: '11px', fontWeight: 600 }}>Full</span>
        </span>
      );
    } else if (val === 'no') {
      return (
        <span className="compare-icon-no" aria-label="Not Supported" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="9" y1="3" x2="3" y2="9" />
            <line x1="3" y1="3" x2="9" y2="9" />
          </svg>
          <span style={{ fontSize: '11px', fontWeight: 600 }}>None</span>
        </span>
      );
    } else {
      return (
        <span className="compare-icon-partial" aria-label="Partially Supported" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
          </svg>
          <span style={{ fontSize: '11px', fontWeight: 600 }}>Partial</span>
        </span>
      );
    }
  };

  return (
    <section className="section" id="compare" aria-label="Feature Comparison">
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow">Comparison</div>
          <h2 className="section-title">Elevate security <span className="grad">beyond filters</span></h2>
          <p className="section-sub">Standard filters block regular words or fail under slightly obfuscated inputs. TENET AI provides true stateful semantic shielding.</p>
        </div>

        <div className="compare-wrap" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px' }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">Capability</th>
                <th scope="col" className="text-center">Keyword Filters</th>
                <th scope="col" className="text-center">Rule-Based Tools</th>
                <th scope="col" className="text-center" style={{ color: 'var(--cyan)' }}>TENET AI Firewall</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.capability}</td>
                  <td className="text-center">{renderIcon(row.keyword)}</td>
                  <td className="text-center">{renderIcon(row.ruleBased)}</td>
                  <td className="text-center" style={{ fontWeight: 600, color: 'var(--text)' }}>
                    {renderIcon(row.tenet)}
                  </td>
                </tr>
              ))}

              {/* Summary progress bar row */}
              <tr className="compare-summary-row">
                <td>Overall Protection Rating</td>
                <td className="text-center">
                  <div className="progress-bar" title="1 out of 3 rating" style={{ justifyContent: 'center' }}>
                    <div className="progress-pill filled" style={{ color: 'var(--red)' }} />
                    <div className="progress-pill" />
                    <div className="progress-pill" />
                    <span style={{ marginLeft: '6px', fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text3)' }}>Weak</span>
                  </div>
                </td>
                <td className="text-center">
                  <div className="progress-bar" title="2 out of 3 rating" style={{ justifyContent: 'center' }}>
                    <div className="progress-pill filled" style={{ color: 'var(--amber)' }} />
                    <div className="progress-pill filled" style={{ color: 'var(--amber)' }} />
                    <div className="progress-pill" />
                    <span style={{ marginLeft: '6px', fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text3)' }}>Medium</span>
                  </div>
                </td>
                <td className="text-center" style={{ borderLeft: '2px solid rgba(0,229,255,0.15)' }}>
                  <div className="progress-bar" title="3 out of 3 rating" style={{ justifyContent: 'center' }}>
                    <div className="progress-pill filled" style={{ color: 'var(--green)' }} />
                    <div className="progress-pill filled" style={{ color: 'var(--green)' }} />
                    <div className="progress-pill filled" style={{ color: 'var(--green)' }} />
                    <span style={{ marginLeft: '6px', fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--green)' }}>Maximum</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
