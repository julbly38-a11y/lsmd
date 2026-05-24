// Sidebar — logo, examples, DB-scale stats, session counters, Groq limits.
const { useState } = React;

function Sidebar({ examples, onPick, stats, limits, provider }) {
  const fmtCost = (c) => c === 0 ? '$0.00' : c < 0.01 ? `$${c.toFixed(6)}` : `$${c.toFixed(4)}`;
  const fmtNum = (n) => n == null ? '—' : Number(n).toLocaleString('en-US');

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logoMark">+</span>
        <div className="logoText">ЛСМД<small>AI Асистент</small></div>
      </div>

      <div className="sideSection">
        <p className="sideLabel">Приклади</p>
        {examples.map((ex, i) => (
          <button key={i} className="exBtn" onClick={() => onPick(ex)}>{ex}</button>
        ))}
      </div>

      <div className="sideFooter">
        <p>110,206 госпіталізацій</p>
        <p>72,293 пацієнти</p>
        <p>20 відділень · 265 лікарів</p>
        <p style={{marginTop:'4px',color:'var(--text3)'}}>2020 → 05.2026 · 22 розділи МКХ</p>

        <div className="sideStats">
          <p className="cap">Сесія</p>
          <p>Запитів: <strong>{stats.count}</strong></p>
          <p>Токенів ↓: <strong>{fmtNum(stats.tokensIn)}</strong></p>
          <p>Токенів ↑: <strong>{fmtNum(stats.tokensOut)}</strong></p>
          <p>Ціна: <strong>{fmtCost(stats.cost)}</strong></p>
        </div>

        {limits && provider === 'groq' && (
          <div className="sideStats">
            <p className="cap">Ліміти Groq</p>
            <p>Запитів: <strong>{fmtNum(limits.requests_remaining)}</strong> / {fmtNum(limits.requests_limit)}</p>
            <p>Токенів: <strong>{fmtNum(limits.tokens_remaining)}</strong> / {fmtNum(limits.tokens_limit)}</p>
          </div>
        )}
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
