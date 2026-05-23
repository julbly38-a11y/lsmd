/* Shared UI kit primitives for Медична */

window.Icon = function Icon({ name, size = 16, stroke = 1.6, color = 'currentColor', style = {} }) {
  const paths = {
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></>,
    users: <><circle cx="9" cy="8" r="4"/><path d="M1 21a8 8 0 0 1 16 0"/><path d="M18 9a4 4 0 0 1 4 4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    chart: <><path d="M3 3v18h18"/><path d="M7 15l4-6 4 3 5-7"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9 1.65 1.65 0 0 0 4.27 7.18l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.34.14.65.4 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    check: <><path d="M20 6L9 17l-5-5"/></>,
    x: <><path d="M18 6L6 18M6 6l12 12"/></>,
    chevronRight: <><path d="M9 18l6-6-6-6"/></>,
    chevronDown: <><path d="M6 9l6 6 6-6"/></>,
    arrow: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    pill: <><rect x="2" y="8" width="20" height="8" rx="4"/><path d="M12 8v8"/></>,
    activity: <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></>,
    filter: <><path d="M22 3H2l8 9.46V19l4 2v-8.54z"/></>,
    microscope: <><path d="M6 18h8M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M8 6l4-4 4 4"/><path d="M12 6v8"/></>,
    menu: <><path d="M3 12h18M3 6h18M3 18h18"/></>,
    message: <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></>,
    heart: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths[name] || null}
    </svg>
  );
};

window.Avatar = function Avatar({ name = '', size = 32, bg }) {
  const initials = name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  const palette = ['#0E4F4F', '#2F6A86', '#3F7A4F', '#B07A18', '#B2412E', '#D96A4A'];
  const pick = bg || palette[(name.charCodeAt(0) || 0) % palette.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, background: pick, color: '#FAF7F2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: size * 0.38,
      flexShrink: 0, letterSpacing: '0.02em',
    }}>{initials}</div>
  );
};

window.Badge = function Badge({ tone = 'neutral', children, dot = true }) {
  const tones = {
    positive: { bg: 'var(--positive-soft)', color: '#2F5D3B', dot: 'var(--positive)' },
    caution:  { bg: 'var(--caution-soft)', color: '#7E5712', dot: 'var(--caution)' },
    critical: { bg: 'var(--critical-soft)', color: '#8F2E1F', dot: 'var(--critical)' },
    info:     { bg: 'var(--info-soft)', color: '#1F4A5E', dot: 'var(--info)' },
    neutral:  { bg: 'var(--paper-3)', color: 'var(--ink-2)', dot: 'var(--ink-3)' },
    brand:    { bg: 'var(--teal-ink-soft)', color: 'var(--teal-ink)', dot: 'var(--teal-ink)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px',
      borderRadius: 999, background: t.bg, color: t.color, fontSize: 11, fontWeight: 500,
      fontFamily: 'IBM Plex Sans, sans-serif', lineHeight: 1.4,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.dot }} />}
      {children}
    </span>
  );
};

window.Button = function Button({ variant = 'primary', size = 'md', icon, children, onClick, disabled }) {
  const base = {
    fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 500, border: '1px solid transparent',
    borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex',
    alignItems: 'center', gap: 6, transition: 'all 120ms cubic-bezier(0.32,0.72,0,1)',
    opacity: disabled ? 0.4 : 1,
  };
  const sizes = { sm: { fontSize: 12, padding: '5px 10px' }, md: { fontSize: 13, padding: '7px 14px' }, lg: { fontSize: 14, padding: '10px 18px' } };
  const variants = {
    primary:   { background: 'var(--teal-ink)', color: 'var(--paper)' },
    secondary: { background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--border-2)' },
    ghost:     { background: 'transparent', color: 'var(--ink-2)' },
    ember:     { background: 'var(--ember)', color: 'var(--paper)' },
    danger:    { background: 'var(--paper)', color: 'var(--critical)', borderColor: 'var(--border-2)' },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant] }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 12 : 14} />}
      {children}
    </button>
  );
};

window.Card = function Card({ children, padding = 16, style = {} }) {
  return (
    <div style={{
      background: 'var(--paper)', border: '1px solid var(--border)',
      borderRadius: 10, padding, boxShadow: '0 1px 2px rgba(15,30,31,0.06)',
      ...style,
    }}>{children}</div>
  );
};

window.Sparkline = function Sparkline({ values = [], color = '#0E4F4F', width = 120, height = 28, fill = true }) {
  if (!values.length) return null;
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const step = width / (values.length - 1);
  const pts = values.map((v, i) => [i * step, height - ((v - min) / span) * (height - 4) - 2]);
  const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const fillD = fill ? d + ` L${width} ${height} L0 ${height} Z` : '';
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {fill && <path d={fillD} fill={color} fillOpacity="0.08" />}
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

window.Logo = function Logo({ variant = 'full', inverted = false, size = 28 }) {
  const src = variant === 'mark'
    ? (inverted ? '../../assets/logo-mark-light.svg' : '../../assets/logo-mark.svg')
    : '../../assets/logo-wordmark.svg';
  return <img src={src} alt="Медична" style={{ height: size, display: 'block' }} />;
};
