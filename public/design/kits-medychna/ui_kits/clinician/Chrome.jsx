window.Sidebar = function Sidebar({ active = 'patients', onNav }) {
  const items = [
    { id: 'overview',  icon: 'home',     label: 'Огляд' },
    { id: 'patients',  icon: 'users',    label: 'Пацієнти', count: 24 },
    { id: 'schedule',  icon: 'calendar', label: 'Прийоми',  count: 8 },
    { id: 'labs',      icon: 'microscope', label: 'Лабораторія', count: 3 },
    { id: 'orders',    icon: 'pill',     label: 'Призначення' },
    { id: 'analytics', icon: 'chart',    label: 'Аналітика' },
  ];
  return (
    <aside style={{ width: 232, background: 'var(--paper)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' }}>
        <Logo variant="mark" size={28} />
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, color: 'var(--ink)' }}>Медична</div>
      </div>
      <nav style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 500, padding: '6px 10px 8px' }}>Клінічна робота</div>
        {items.map(it => {
          const isActive = active === it.id;
          return (
            <a key={it.id} href="#" onClick={e => { e.preventDefault(); onNav && onNav(it.id); }} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 6,
              fontSize: 13, fontWeight: isActive ? 500 : 400,
              color: isActive ? 'var(--teal-ink)' : 'var(--ink-2)',
              background: isActive ? 'var(--teal-ink-soft)' : 'transparent',
              boxShadow: isActive ? 'inset 2px 0 0 var(--teal-ink)' : 'none',
              textDecoration: 'none', transition: 'background 120ms',
            }}>
              <Icon name={it.icon} size={15} />
              <span>{it.label}</span>
              {it.count != null && <span style={{ marginLeft: 'auto', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--ink-3)' }}>{it.count}</span>}
            </a>
          );
        })}
      </nav>
      <div style={{ marginTop: 'auto', padding: 12, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name="Ірина Бойко" size={32} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Ірина Бойко</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Ендокринолог</div>
        </div>
        <Icon name="settings" size={14} color="var(--ink-3)" />
      </div>
    </aside>
  );
};

window.TopBar = function TopBar({ title, subtitle, actions, breadcrumbs }) {
  return (
    <header style={{ padding: '18px 28px 16px', borderBottom: '1px solid var(--border)', background: 'var(--paper)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
      <div>
        {breadcrumbs && <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          {breadcrumbs.map((c, i) => <React.Fragment key={i}>
            {i > 0 && <Icon name="chevronRight" size={10} color="var(--ink-4)" />}
            <span style={{ color: i === breadcrumbs.length - 1 ? 'var(--ink-2)' : 'var(--ink-3)' }}>{c}</span>
          </React.Fragment>)}
        </div>}
        <h1 style={{ margin: 0, fontFamily: 'Instrument Serif, serif', fontSize: 30, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--ink)', lineHeight: 1.1 }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>{subtitle}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{actions}</div>
    </header>
  );
};

window.SearchBar = function SearchBar({ value, onChange, placeholder = 'Пошук' }) {
  return (
    <div style={{ position: 'relative', width: 280 }}>
      <Icon name="search" size={14} color="var(--ink-3)" style={{ position: 'absolute', left: 10, top: 8 }} />
      <input value={value || ''} onChange={e => onChange && onChange(e.target.value)} placeholder={placeholder} style={{
        width: '100%', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, padding: '7px 10px 7px 32px',
        background: 'var(--paper-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--ink)', outline: 'none',
      }} />
    </div>
  );
};
