window.PatientTabBar = function PatientTabBar({ active, onChange }) {
  const tabs = [
    { id: 'home',    icon: 'home',     label: 'Головна' },
    { id: 'results', icon: 'activity', label: 'Результати' },
    { id: 'visits',  icon: 'calendar', label: 'Візити' },
    { id: 'chat',    icon: 'message',  label: 'Чат' },
    { id: 'me',      icon: 'user',     label: 'Я' },
  ];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--paper)', borderTop: '1px solid var(--border)', display: 'flex', padding: '8px 8px 22px' }}>
      {tabs.map(t => {
        const sel = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            flex: 1, background: 'transparent', border: 0, padding: '6px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: sel ? 'var(--teal-ink)' : 'var(--ink-3)', cursor: 'pointer',
          }}>
            <Icon name={t.icon} size={20} stroke={sel ? 1.8 : 1.5} />
            <span style={{ fontSize: 10, fontWeight: sel ? 600 : 500 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

window.PatientHome = function PatientHome({ name, onOpenResults }) {
  const greeting = new Date().getHours() < 12 ? 'Доброго ранку' : (new Date().getHours() < 18 ? 'Доброго дня' : 'Доброго вечора');
  return (
    <div style={{ padding: '60px 20px 100px', overflow: 'auto', height: '100%', background: 'var(--paper)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{greeting},</div>
        <Icon name="bell" size={18} color="var(--ink-2)" />
      </div>
      <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 30, fontWeight: 400, margin: '0 0 24px', letterSpacing: '-0.01em' }}>{name}</h1>

      {/* Next appointment hero card */}
      <div style={{ background: 'var(--ink)', color: 'var(--paper)', borderRadius: 14, padding: 18, marginBottom: 18, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A1A1', fontWeight: 500 }}>Наступний візит</div>
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 26, marginTop: 8, lineHeight: 1.15 }}>Четвер, 25 квіт.</div>
        <div style={{ fontSize: 13, color: '#D6CFC0', marginTop: 4 }}>14:30 · д-р Ірина Бойко · Ендокринологія</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button style={{ background: 'var(--ember)', color: 'var(--paper)', border: 0, padding: '8px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500, fontFamily: 'IBM Plex Sans, sans-serif' }}>Переглянути</button>
          <button style={{ background: 'transparent', color: 'var(--paper)', border: '1px solid #5E6B6C', padding: '8px 14px', borderRadius: 6, fontSize: 12, fontFamily: 'IBM Plex Sans, sans-serif' }}>Перенести</button>
        </div>
      </div>

      {/* Results ready */}
      <div onClick={onOpenResults} style={{ background: 'var(--ember-soft)', border: '1px solid #F1C9B6', borderRadius: 12, padding: 14, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--ember)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="file" size={16} color="var(--paper)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#8F3E24' }}>Результати аналізів готові</div>
          <div style={{ fontSize: 11, color: '#8F3E24', opacity: 0.75 }}>Загальний аналіз крові · 22 квіт.</div>
        </div>
        <Icon name="chevronRight" size={16} color="#8F3E24" />
      </div>

      {/* Today's care */}
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500, marginBottom: 10 }}>Сьогодні</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { icon: 'pill', title: 'Метформін · 500 мг', sub: 'Ранок, з їжею', done: true },
          { icon: 'pill', title: 'Еналаприл · 10 мг',  sub: 'Ранок',         done: true },
          { icon: 'activity', title: 'Виміряти глюкозу', sub: 'Перед обідом', done: false },
          { icon: 'pill', title: 'Метформін · 500 мг', sub: 'Вечір, з їжею', done: false },
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 999, border: '1.5px solid ' + (t.done ? 'var(--positive)' : 'var(--border-2)'), background: t.done ? 'var(--positive)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {t.done && <Icon name="check" size={12} color="var(--paper)" stroke={2.5} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.55 : 1 }}>{t.title}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{t.sub}</div>
            </div>
            <Icon name={t.icon} size={16} color="var(--ink-3)" />
          </div>
        ))}
      </div>
    </div>
  );
};

window.PatientResults = function PatientResults({ onBack }) {
  return (
    <div style={{ padding: '52px 20px 100px', overflow: 'auto', height: '100%', background: 'var(--paper)' }}>
      <button onClick={onBack} style={{ background: 'transparent', border: 0, color: 'var(--teal-ink)', padding: '6px 0', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontFamily: 'IBM Plex Sans' }}>
        <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)' }} /> Назад
      </button>
      <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 26, fontWeight: 400, margin: '12px 0 4px' }}>Загальний аналіз крові</h1>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 20 }}>22 квіт. 2026 · Лабораторія «Синево»</div>

      <div style={{ background: 'var(--teal-ink-soft)', borderRadius: 12, padding: 14, marginBottom: 20, display: 'flex', gap: 12 }}>
        <div style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--teal-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="check" size={14} color="var(--paper)" stroke={2.5} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--teal-ink)' }}>Більшість показників у нормі</div>
          <div style={{ fontSize: 11, color: 'var(--teal-ink)', opacity: 0.8, marginTop: 2 }}>1 показник потребує уваги. Обговоримо на візиті 25 квіт.</div>
        </div>
      </div>

      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500, marginBottom: 10 }}>Показники</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { n: 'Гемоглобін',  v: '138', u: 'г/л',      ref: '130–175', tone: 'positive' },
          { n: 'Еритроцити',  v: '4,6', u: '×10¹²/л', ref: '4,0–5,2', tone: 'positive' },
          { n: 'Лейкоцити',   v: '9,8', u: '×10⁹/л',  ref: '4,0–9,0', tone: 'caution'  },
          { n: 'Тромбоцити',  v: '264', u: '×10⁹/л',  ref: '150–400', tone: 'positive' },
          { n: 'ШОЕ',         v: '12',  u: 'мм/год',   ref: '< 15',   tone: 'positive' },
        ].map((r, i) => {
          const c = { positive: 'var(--positive)', caution: 'var(--caution)', critical: 'var(--critical)' }[r.tone];
          const bg = { positive: 'var(--positive-soft)', caution: 'var(--caution-soft)', critical: 'var(--critical-soft)' }[r.tone];
          return (
            <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.n}</div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, color: c, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{r.v} <span style={{ color: 'var(--ink-3)', fontWeight: 400, fontSize: 11 }}>{r.u}</span></div>
              </div>
              <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: 'var(--paper-3)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20%', right: '30%', height: 4, background: bg, borderRadius: 2 }} />
                <div style={{ position: 'absolute', left: r.tone === 'caution' ? '72%' : '48%', top: -2, width: 2, height: 8, background: c, borderRadius: 1 }} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6, fontFamily: 'IBM Plex Mono, monospace' }}>Реф: {r.ref} {r.u}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

window.PatientPlaceholder = function PatientPlaceholder({ label }) {
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, color: 'var(--ink-3)' }}>
      <Icon name="clock" size={24} />
      <div style={{ fontSize: 13 }}>{label}</div>
    </div>
  );
};
