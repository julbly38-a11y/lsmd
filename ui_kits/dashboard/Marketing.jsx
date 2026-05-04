// Dashboard UI kit — marketing site + dashboard shell with red brand accent.
// Pages: Home, Analytics, Asystent (the AI chat), About, Pricing.

const { useState, useEffect } = React;

const NAV = [
  { id: 'home', label: 'Головна' },
  { id: 'analytics', label: 'Аналітика' },
  { id: 'asystent', label: 'AI Асистент' },
  { id: 'pricing', label: 'Тарифи' },
  { id: 'about', label: 'Про нас' },
];

function TopNav({ page, setPage }) {
  return (
    <nav className="topnav">
      <a className="brand" onClick={() => setPage('home')} style={{cursor:'pointer'}}>
        <span className="mark">+</span>
        <span className="name">ЛСМД</span>
      </a>
      <div className="navlinks">
        {NAV.map(n => (
          <a key={n.id} className={`navlink${page===n.id?' active':''}`} onClick={() => setPage(n.id)}>{n.label}</a>
        ))}
      </div>
      <div className="navcta">
        <span className="btn-text">Увійти</span>
        <button className="btn-primary" onClick={() => setPage('analytics')}>Спробувати</button>
      </div>
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <div data-page="home" className="visible">
      <section className="hero">
        <div className="eyebrow">Медична аналітика</div>
        <h1>Перетворюємо лікарняні дані<br/>на <em>відповіді</em>, які ви запитуєте звичайною мовою.</h1>
        <p className="lede">
          ЛСМД — платформа аналітики для медичних установ. Підключаєте базу даних — отримуєте дашборди, звіти та KPI по всій лікарні. Питання ставите своєю мовою, а не SQL.
        </p>
        <div className="cta-row">
          <button className="btn-primary" onClick={() => setPage('analytics')}>Спробувати безкоштовно</button>
          <button className="btn-secondary" onClick={() => setPage('about')}>Дізнатися більше</button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="num">20,491</div><div className="lbl">Госпіталізацій</div></div>
          <div className="hero-stat"><div className="num">15,427</div><div className="lbl">Пацієнтів</div></div>
          <div className="hero-stat"><div className="num">202</div><div className="lbl">Лікарі</div></div>
          <div className="hero-stat"><div className="num">13</div><div className="lbl">Відділень</div></div>
        </div>
      </section>

      <section className="section">
        <h2>Що вміє платформа</h2>
        <p className="desc">Три рівні роботи з даними — від готових дашбордів до питань природною мовою.</p>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="glyph">+</div>
            <h3>Дашборди та KPI</h3>
            <p>Готові панелі з ключовими показниками: летальність, навантаження, ліжко-дні, повторні госпіталізації — оновлюються щодня.</p>
          </div>
          <div className="feature-card">
            <div className="glyph">→</div>
            <h3>AI Асистент</h3>
            <p>Запитуйте про дані звичайною мовою — система перекладе у SQL і поверне результат таблицею, числом або графіком.</p>
          </div>
          <div className="feature-card">
            <div className="glyph">Σ</div>
            <h3>Звіти та експорт</h3>
            <p>Експорт у PDF та CSV. Шаблони для МОЗ. Заплановані звіти на електронну пошту головного лікаря.</p>
          </div>
        </div>
      </section>

      <footer className="foot">
        <span>© ЛСМД · 2026</span>
        <span>+ Лікарня Швидкої Медичної Допомоги</span>
      </footer>
    </div>
  );
}

function PricingPage() {
  return (
    <div data-page="pricing" className="visible">
      <section className="section">
        <div className="eyebrow">Тарифи</div>
        <h2>Прозоре ціноутворення</h2>
        <p className="desc">Без прихованих ліцензій. Безкоштовний старт для лікарень до 5,000 госпіталізацій на рік.</p>
        <div className="price-grid">
          <div className="price-card">
            <div className="tier">Старт</div>
            <div className="price"><span className="num">0</span><span className="per">грн / місяць</span></div>
            <ul>
              <li>До 5,000 госпіталізацій</li>
              <li>Базові дашборди</li>
              <li>AI Асистент: 100 запитів</li>
              <li>Експорт CSV</li>
            </ul>
            <button className="btn-secondary pcta">Почати</button>
          </div>
          <div className="price-card featured">
            <div className="tier">Клініка</div>
            <div className="price"><span className="num">14,900</span><span className="per">грн / місяць</span></div>
            <ul>
              <li>Без обмежень госпіталізацій</li>
              <li>Всі дашборди + кастомні</li>
              <li>AI Асистент: безлімітно</li>
              <li>Заплановані звіти</li>
              <li>Шаблони МОЗ</li>
            </ul>
            <button className="btn-primary pcta">Замовити демо</button>
          </div>
          <div className="price-card">
            <div className="tier">Мережа</div>
            <div className="price"><span className="num">за домовленістю</span></div>
            <ul>
              <li>Декілька установ</li>
              <li>SSO + ролі</li>
              <li>Власний сервер / on-prem</li>
              <li>SLA 99.9%</li>
            </ul>
            <button className="btn-secondary pcta">Зв'язатися</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div data-page="about" className="visible">
      <section className="section">
        <div className="eyebrow">Про компанію</div>
        <h2>ЛСМД</h2>
        <div className="about-grid">
          <div>
            <p>ЛСМД — це інформаційна компанія, що працює з медичними даними. Ми будуємо платформу аналітики для лікарень швидкої медичної допомоги: підключаємо їхні бази, нормалізуємо дані, виводимо у дашборди та надаємо AI-асистента, який відповідає на питання звичайною українською мовою.</p>
            <p>Команда інженерів, лікарів та аналітиків. Працюємо з реальною лікарнею — 20,491 госпіталізація, 13 відділень, 202 лікарі.</p>
            <p>База даних — на Supabase, код — на GitHub, AI — мульти-провайдер: Groq, Gemini, OpenAI, Anthropic. Без вендор-локу.</p>
          </div>
          <div className="about-side">
            <dl>
              <dt>Заснована</dt><dd>2025</dd>
              <dt>Команда</dt><dd>8 інженерів · 2 лікарі · 1 аналітик</dd>
              <dt>Партнери</dt><dd>1 лікарня швидкої медичної допомоги</dd>
              <dt>Стек</dt><dd>Next.js · Supabase · Netlify</dd>
              <dt>Контакт</dt><dd>info@lsmd.health</dd>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}

window.TopNav = TopNav;
window.HomePage = HomePage;
window.PricingPage = PricingPage;
window.AboutPage = AboutPage;
window.NAV = NAV;
