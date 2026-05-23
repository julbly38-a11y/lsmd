window.PatientList = function PatientList({ patients, selectedId, onSelect }) {
  return (
    <div style={{ borderRight: '1px solid var(--border)', width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--paper)' }}>
      <div style={{ padding: '14px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500 }}>Палата 3, поверх 2</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Пацієнти на обході · {patients.length}</div>
        </div>
        <Button variant="ghost" size="sm" icon="filter">Фільтр</Button>
      </div>
      <div style={{ overflow: 'auto', flex: 1 }}>
        {patients.map(p => {
          const sel = p.id === selectedId;
          return (
            <div key={p.id} onClick={() => onSelect(p.id)} style={{
              padding: '12px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer',
              background: sel ? 'var(--teal-ink-soft)' : 'transparent',
              boxShadow: sel ? 'inset 3px 0 0 var(--teal-ink)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={p.name} size={34} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{p.name}</div>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: 'var(--ink-3)' }}>{p.id}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{p.age} р · {p.dx}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10, alignItems: 'center' }}>
                <Badge tone={p.tone}>{p.status}</Badge>
                <span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 'auto' }}>{p.lastSeen}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

window.VitalCard = function VitalCard({ label, value, unit, delta, tone = 'neutral', trend }) {
  const toneColor = { positive: 'var(--positive)', caution: 'var(--caution)', critical: 'var(--critical)', neutral: 'var(--ink-3)' }[tone];
  return (
    <Card padding={16} style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 10 }}>
        <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: 34, lineHeight: 1, color: 'var(--ink)' }}>{value}</span>
        {unit && <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{unit}</span>}
      </div>
      {trend && <div style={{ marginTop: 10 }}><Sparkline values={trend} color={toneColor} width={160} height={28} /></div>}
      {delta && <div style={{ marginTop: 8, fontSize: 11, color: toneColor, fontWeight: 500 }}>{delta}</div>}
    </Card>
  );
};

window.PatientDetail = function PatientDetail({ patient }) {
  if (!patient) return null;
  const [tab, setTab] = React.useState('overview');
  const tabs = [
    { id: 'overview', label: 'Огляд' },
    { id: 'labs',     label: 'Лабораторія' },
    { id: 'notes',    label: 'Нотатки' },
    { id: 'orders',   label: 'Призначення' },
    { id: 'history',  label: 'Історія' },
  ];
  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--paper)' }}>
      {/* Patient header */}
      <div style={{ padding: '20px 28px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar name={patient.name} size={56} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ margin: 0, fontFamily: 'Instrument Serif, serif', fontSize: 28, fontWeight: 400, color: 'var(--ink)' }}>{patient.name}</h2>
              <Badge tone={patient.tone}>{patient.status}</Badge>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, display: 'flex', gap: 16 }}>
              <span>{patient.sex} · {patient.age} років</span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{patient.id}</span>
              <span>Палата {patient.room}</span>
              <span>Поступив {patient.admitted}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="md" icon="message">Повідомити</Button>
            <Button variant="primary" size="md" icon="plus">Призначення</Button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 20 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: 'transparent', border: 0, padding: '8px 14px',
              fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13,
              color: tab === t.id ? 'var(--ink)' : 'var(--ink-3)',
              fontWeight: tab === t.id ? 600 : 400,
              borderBottom: '2px solid ' + (tab === t.id ? 'var(--teal-ink)' : 'transparent'),
              marginBottom: -1, cursor: 'pointer',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: 28 }}>
        {tab === 'overview' && <>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <VitalCard label="Температура" value="36,6" unit="°C" tone="positive" trend={[36.4, 36.8, 37.1, 36.9, 36.7, 36.6, 36.6]} delta="В межах норми · 7 днів" />
            <VitalCard label="HbA1c" value="7,4" unit="%" tone="caution" trend={[8.2, 8.0, 7.9, 7.7, 7.6, 7.5, 7.4]} delta="↓ 0,8 % за 90 днів" />
            <VitalCard label="SpO₂" value="97" unit="%" tone="positive" trend={[95, 96, 96, 97, 97, 97, 97]} delta="Стабільно" />
            <VitalCard label="АТ, систол." value="128" unit="мм рт. ст." tone="neutral" trend={[135, 132, 130, 128, 130, 128, 128]} delta="Цільове < 130" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <Card padding={20}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Останні результати</h3>
                <a href="#" style={{ fontSize: 12, color: 'var(--teal-ink)', textDecoration: 'none' }}>Усі результати →</a>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr style={{ borderBottom: '1px solid var(--border-2)' }}>
                  <th style={{ textAlign: 'left', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500, padding: '6px 0' }}>Аналіз</th>
                  <th style={{ textAlign: 'right', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500, padding: '6px 0' }}>Значення</th>
                  <th style={{ textAlign: 'right', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500, padding: '6px 0' }}>Референс</th>
                  <th style={{ textAlign: 'right', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500, padding: '6px 0' }}>Коли</th>
                </tr></thead>
                <tbody style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  {[
                    { n: 'Глюкоза натщесерце', v: '7,8', ref: '4,1–5,9', u: 'ммоль/л', tone: 'critical', when: '08:14' },
                    { n: 'HbA1c',              v: '7,4', ref: '< 6,5',  u: '%',       tone: 'caution',  when: '22 квіт.' },
                    { n: 'Креатинін',          v: '84',  ref: '62–115', u: 'мкмоль/л', tone: 'positive', when: '22 квіт.' },
                    { n: 'Гемоглобін',         v: '138', ref: '130–175', u: 'г/л',     tone: 'positive', when: '22 квіт.' },
                    { n: 'ШОЕ',                v: '12',  ref: '< 15',   u: 'мм/год',   tone: 'positive', when: '22 квіт.' },
                  ].map((r, i) => {
                    const c = { positive: 'var(--positive)', caution: 'var(--caution)', critical: 'var(--critical)' }[r.tone];
                    return <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 0' }}>{r.n}</td>
                      <td style={{ textAlign: 'right', fontFamily: 'IBM Plex Mono, monospace', color: c, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{r.v} <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>{r.u}</span></td>
                      <td style={{ textAlign: 'right', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--ink-3)', fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{r.ref}</td>
                      <td style={{ textAlign: 'right', color: 'var(--ink-3)', fontSize: 12 }}>{r.when}</td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </Card>

            <Card padding={20}>
              <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Активні призначення</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { n: 'Метформін', d: '500 мг · 2 р./добу', t: 'з 03 квіт.' },
                  { n: 'Гліклазид', d: '30 мг · ранок', t: 'з 12 квіт.' },
                  { n: 'Еналаприл', d: '10 мг · ранок', t: 'з 12 лют.' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderTop: i ? '1px solid var(--border)' : 0 }}>
                    <div style={{ width: 28, height: 28, background: 'var(--teal-ink-soft)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name="pill" size={14} color="var(--teal-ink)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{m.n}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{m.d}</div>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{m.t}</div>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', marginTop: 12, padding: '8px', border: '1px dashed var(--border-2)', borderRadius: 6, background: 'transparent', color: 'var(--ink-2)', fontFamily: 'IBM Plex Sans', fontSize: 12, cursor: 'pointer' }}>+ Додати призначення</button>
            </Card>
          </div>
        </>}
        {tab !== 'overview' && <Card padding={40}><div style={{ textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>Розділ «{tabs.find(t => t.id === tab).label}» — клікабельна заглушка.</div></Card>}
      </div>
    </div>
  );
};
