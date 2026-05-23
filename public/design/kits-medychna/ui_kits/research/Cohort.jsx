window.ResearchChrome = function ResearchChrome({ children }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--paper)' }}>
      <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, background: 'var(--paper)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo variant="mark" size={24} />
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 20 }}>Медична</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', padding: '2px 8px', background: 'var(--paper-2)', borderRadius: 999, marginLeft: 4, fontFamily: 'IBM Plex Mono, monospace' }}>Research</div>
        </div>
        <nav style={{ display: 'flex', gap: 2, marginLeft: 12 }}>
          {['Cohorts', 'Datasets', 'Notebooks', 'Reports'].map((n, i) => (
            <a key={n} href="#" style={{
              padding: '6px 12px', borderRadius: 6, fontSize: 13,
              color: i === 0 ? 'var(--ink)' : 'var(--ink-3)',
              background: i === 0 ? 'var(--paper-2)' : 'transparent',
              fontWeight: i === 0 ? 500 : 400, textDecoration: 'none',
            }}>{n}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <SearchBar placeholder="Search cohorts, datasets, notebooks" />
          <Avatar name="Mykola Petrov" size={28} />
        </div>
      </div>
      {children}
    </div>
  );
};

window.CohortBuilder = function CohortBuilder() {
  const [filters, setFilters] = React.useState([
    { field: 'Diagnosis (ICD-10)',  op: 'is',      val: 'E11.9 · Type 2 diabetes' },
    { field: 'Age',                 op: 'between', val: '45–75' },
    { field: 'HbA1c',               op: '≥',       val: '7.0 %' },
  ]);
  const cohortSize = 1248;

  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '360px 1fr', minHeight: 0 }}>
      {/* Left: filter builder */}
      <div style={{ borderRight: '1px solid var(--border)', padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', background: 'var(--paper)' }}>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500 }}>Cohort</div>
        <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 24, fontWeight: 400, margin: '4px 0 18px' }}>T2D · HbA1c ≥ 7 · age 45–75</h2>

        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500, marginBottom: 8 }}>Inclusion criteria</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filters.map((f, i) => (
            <div key={i} style={{ background: 'var(--paper-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 10px', fontSize: 12 }}>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', marginBottom: 2 }}>{f.field}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--teal-ink)', background: 'var(--teal-ink-soft)', padding: '1px 5px', borderRadius: 3 }}>{f.op}</span>
                <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{f.val}</span>
              </div>
            </div>
          ))}
          <button style={{ border: '1px dashed var(--border-2)', background: 'transparent', padding: '8px', borderRadius: 6, color: 'var(--ink-2)', fontFamily: 'IBM Plex Sans', fontSize: 12, cursor: 'pointer' }}>+ Add criterion</button>
        </div>

        <div style={{ marginTop: 20, padding: 14, background: 'var(--ink)', color: 'var(--paper)', borderRadius: 10 }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A1A1', fontWeight: 500 }}>Cohort size</div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 44, lineHeight: 1, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{cohortSize.toLocaleString('en-US').replace(/,/g, ' ')}</div>
          <div style={{ fontSize: 11, color: '#D6CFC0', marginTop: 4 }}>patients · 12 hospitals · 2021–2026</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            <button style={{ background: 'var(--ember)', color: 'var(--paper)', border: 0, padding: '7px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500, fontFamily: 'IBM Plex Sans' }}>Run analysis</button>
            <button style={{ background: 'transparent', color: 'var(--paper)', border: '1px solid #5E6B6C', padding: '7px 12px', borderRadius: 6, fontSize: 12, fontFamily: 'IBM Plex Sans' }}>Export</button>
          </div>
        </div>
      </div>

      {/* Right: results */}
      <div style={{ overflow: 'auto', padding: 24, background: 'var(--paper-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500 }}>Results</div>
            <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 26, fontWeight: 400, margin: '4px 0 0' }}>HbA1c response to metformin titration</h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="md" icon="download">Export CSV</Button>
            <Button variant="primary" size="md" icon="chart">Open notebook</Button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
          {[
            { l: 'Mean baseline HbA1c', v: '8.4', u: '%',  sub: 'SD 1.2' },
            { l: 'Mean Δ at 12 weeks',  v: '−1.1', u: '%', sub: 'p < 0.001', tone: 'positive' },
            { l: 'Responders (≥ 0.5 %)', v: '72', u: '%',  sub: '899 / 1 248' },
            { l: 'Attrition',            v: '8.4', u: '%', sub: '105 pt.' },
          ].map((s, i) => (
            <Card key={i} padding={14}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500 }}>{s.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: 30, lineHeight: 1, color: s.tone === 'positive' ? 'var(--positive)' : 'var(--ink)' }}>{s.v}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{s.u}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6, fontFamily: 'IBM Plex Mono, monospace' }}>{s.sub}</div>
            </Card>
          ))}
        </div>

        <Card padding={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>HbA1c distribution · week 12</h3>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>n = 1 143</div>
          </div>
          <Histogram />
        </Card>
      </div>
    </div>
  );
};

window.Histogram = function Histogram() {
  // Rough normal-ish distribution
  const data = [3, 8, 18, 34, 58, 92, 128, 156, 168, 152, 122, 88, 54, 32, 18, 8, 3];
  const max = Math.max(...data);
  const W = 780, H = 220, pad = 32, innerH = H - pad * 2 - 20;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ marginTop: 14, display: 'block' }}>
      {/* Y grid */}
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = pad + innerH * (1 - t);
        return <g key={t}>
          <line x1={pad} x2={W - pad} y1={y} y2={y} stroke="#E5DFD2" strokeWidth="1" />
          <text x={pad - 6} y={y + 3} fontSize="10" fill="#5E6B6C" textAnchor="end" fontFamily="IBM Plex Mono, monospace">{Math.round(max * t)}</text>
        </g>;
      })}
      {/* Bars */}
      {data.map((v, i) => {
        const barW = (W - pad * 2) / data.length - 4;
        const x = pad + i * ((W - pad * 2) / data.length) + 2;
        const h = (v / max) * innerH;
        const tone = (i >= 4 && i <= 9) ? '#3F7A4F' : (i < 4 ? '#2F6A86' : '#B07A18');
        return <rect key={i} x={x} y={pad + innerH - h} width={barW} height={h} rx="2" fill={tone} fillOpacity="0.85" />;
      })}
      {/* X axis labels */}
      {['5.0', '6.0', '7.0', '8.0', '9.0', '10.0'].map((t, i) => (
        <text key={t} x={pad + i * ((W - pad * 2) / 5)} y={H - 8} fontSize="10" fill="#5E6B6C" textAnchor="middle" fontFamily="IBM Plex Mono, monospace">{t} %</text>
      ))}
      {/* Target band */}
      <rect x={pad + ((6.5 - 5) / 5) * (W - pad * 2)} y={pad} width={((1) / 5) * (W - pad * 2)} height={innerH} fill="#3F7A4F" fillOpacity="0.06" />
      <text x={pad + ((7) / 5) * (W - pad * 2)} y={pad + 14} fontSize="10" fill="#3F7A4F" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontWeight="500">target ≤ 7.0 %</text>
    </svg>
  );
};
