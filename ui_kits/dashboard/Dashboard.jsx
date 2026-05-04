// Dashboard shell — sidebar + header + page content (Analytics + Asystent tab).
const { useState: useStateD } = React;

const DASH_NAV = [
  { id: 'overview', label: 'Огляд', gl: '◆', group: 'Аналітика' },
  { id: 'departments', label: 'Відділення', gl: '▦', group: 'Аналітика' },
  { id: 'doctors', label: 'Лікарі', gl: '◐', group: 'Аналітика' },
  { id: 'patients', label: 'Пацієнти', gl: '○', group: 'Аналітика' },
  { id: 'asystent', label: 'AI Асистент', gl: '+', group: 'Інструменти' },
  { id: 'reports', label: 'Звіти', gl: 'Σ', group: 'Інструменти' },
  { id: 'settings', label: 'Налаштування', gl: '⚙', group: 'Інструменти' },
];

function DashSidebar({ active, setActive, onExit }) {
  const groups = [...new Set(DASH_NAV.map(n => n.group))];
  return (
    <aside className="dash-sidebar">
      <a className="brand" onClick={onExit} style={{cursor:'pointer'}}>
        <span className="mark">+</span>
        <span className="name">ЛСМД</span>
      </a>
      <div className="dash-nav">
        {groups.map(g => (
          <div key={g} className="group">
            <div className="group-label">{g}</div>
            {DASH_NAV.filter(n => n.group === g).map(n => (
              <div key={n.id} className={`dash-nav-item${active===n.id?' active':''}`} onClick={() => setActive(n.id)}>
                <span className="gl">{n.gl}</span>
                <span>{n.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="dash-user">
        <div className="ava">ОД</div>
        <div className="who">
          <div className="name">Олена Дубець</div>
          <div className="role">завідувач</div>
        </div>
      </div>
    </aside>
  );
}

function OverviewPage() {
  const dept = [
    { name: 'Терапевтичне', val: 4218, pct: 100 },
    { name: 'Хірургічне', val: 3812, pct: 90 },
    { name: 'Кардіологічне', val: 2941, pct: 70 },
    { name: 'Неврологічне', val: 2103, pct: 50 },
    { name: 'Травматологічне', val: 1887, pct: 45 },
    { name: 'Гінекологічне', val: 1402, pct: 33 },
    { name: 'Урологічне', val: 1184, pct: 28 },
  ];
  // hourly load — random-ish curve, peak at 11
  const hours = [12,18,14,10,8,6,8,16,28,42,56,72,68,60,50,44,38,30,28,24,22,20,18,16];
  const peak = Math.max(...hours);

  return (
    <>
      <div className="dash-header">
        <div>
          <div className="crumbs">Аналітика · Огляд</div>
          <h1>Дашборд лікарні</h1>
        </div>
        <button className="btn-secondary">Експорт PDF</button>
      </div>
      <div className="dash-content">
        <div className="kpi-row">
          <div className="kpi"><div className="lbl">Госпіталізацій</div><div className="val">20,491</div><div className="delta up">↑ 4.2% від попереднього місяця</div></div>
          <div className="kpi"><div className="lbl">Летальність</div><div className="val">2.4%</div><div className="delta down">↑ 0.3 п.п.</div></div>
          <div className="kpi"><div className="lbl">Сер. ліжкодень</div><div className="val">7.3</div><div className="delta up">↓ 0.4 дня</div></div>
          <div className="kpi"><div className="lbl">Хір. активність</div><div className="val">38.1%</div><div className="delta up">↑ 1.8 п.п.</div></div>
        </div>

        <div className="chart-row">
          <div className="panel">
            <div className="panel-head"><h3>Пікові навантаження по годинах</h3><span className="filter">Грудень 2025 ▾</span></div>
            <div className="barchart">
              {hours.map((h, i) => (
                <div key={i} className={`bar${h===peak?' peak':''}`} style={{height: `${(h/peak)*100}%`}}></div>
              ))}
            </div>
            <div className="barchart-x">
              {hours.map((_, i) => <span key={i}>{i % 4 === 0 ? `${String(i).padStart(2,'0')}:00` : ''}</span>)}
            </div>
          </div>
          <div className="panel">
            <div className="panel-head"><h3>Топ відділень</h3><span className="filter">за к-стю</span></div>
            <div className="dept-list">
              {dept.map(d => (
                <div key={d.name} className="dept-row">
                  <span className="name">{d.name}</span>
                  <span className="bar-wrap"><span className="bar-fill" style={{width:`${d.pct}%`}}></span></span>
                  <span className="pct">{d.val.toLocaleString('en-US')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head"><h3>Останні госпіталізації</h3><span className="filter">всі ▾</span></div>
          <div className="table-wrap">
            <table className="dtable">
              <thead><tr><th>Пацієнт</th><th>Відділення</th><th>Лікар</th><th>Дата</th><th>Статус</th></tr></thead>
              <tbody>
                <tr><td>Петренко О.І.</td><td>Кардіологічне</td><td>Дубець О.</td><td>28.04.2026</td><td><span className="badge-soft green">Виписаний</span></td></tr>
                <tr><td>Іванова Г.М.</td><td>Терапевтичне</td><td>Шевчук А.</td><td>28.04.2026</td><td><span className="badge-soft green">Виписаний</span></td></tr>
                <tr><td>Коваленко Б.С.</td><td>Реанімаційне</td><td>Дубець О.</td><td>27.04.2026</td><td><span className="badge-soft">Інтенсивна</span></td></tr>
                <tr><td>Мельник В.П.</td><td>Хірургічне</td><td>Бойко Р.</td><td>27.04.2026</td><td><span className="badge-soft green">Виписаний</span></td></tr>
                <tr><td>Бондаренко Т.К.</td><td>Травматологічне</td><td>Шевчук А.</td><td>26.04.2026</td><td><span className="badge-soft">Лікується</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function AsystentTab() {
  return (
    <>
      <div className="dash-header">
        <div>
          <div className="crumbs">Інструменти · AI Асистент</div>
          <h1>Запитайте дані звичайною мовою</h1>
        </div>
        <span style={{fontFamily:'var(--mono)',fontSize:'11px',color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.08em'}}>Вкладка для авторизованих</span>
      </div>
      <div style={{flex:1,minHeight:0,overflow:'hidden'}}>
        <iframe src="../asystent/index.html" style={{width:'100%',height:'100%',border:'none',display:'block'}} title="AI Асистент"></iframe>
      </div>
    </>
  );
}

function StubPage({ title, crumb }) {
  return (
    <>
      <div className="dash-header">
        <div><div className="crumbs">{crumb}</div><h1>{title}</h1></div>
      </div>
      <div className="dash-content">
        <div className="panel" style={{padding:'48px',textAlign:'center'}}>
          <div style={{fontFamily:'var(--mono)',fontSize:'24px',color:'var(--text3)',marginBottom:'8px'}}>○</div>
          <p style={{fontSize:'13px',color:'var(--text2)'}}>Ця сторінка ще не реалізована в дизайн-системі. Натисніть на «Огляд» або «AI Асистент».</p>
        </div>
      </div>
    </>
  );
}

function Dashboard({ onExit, initialActive = 'overview' }) {
  const [active, setActive] = useStateD(initialActive);
  return (
    <div className="dashboard visible">
      <DashSidebar active={active} setActive={setActive} onExit={onExit} />
      <div className="dash-main">
        {active === 'overview' && <OverviewPage />}
        {active === 'asystent' && <AsystentTab />}
        {active === 'departments' && <StubPage title="Відділення" crumb="Аналітика · Відділення" />}
        {active === 'doctors' && <StubPage title="Лікарі" crumb="Аналітика · Лікарі" />}
        {active === 'patients' && <StubPage title="Пацієнти" crumb="Аналітика · Пацієнти" />}
        {active === 'reports' && <StubPage title="Звіти" crumb="Інструменти · Звіти" />}
        {active === 'settings' && <StubPage title="Налаштування" crumb="Інструменти · Налаштування" />}
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
