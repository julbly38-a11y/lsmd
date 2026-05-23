// ProviderBar — Groq / Gemini / OpenAI / Anthropic chip selector.
function ProviderBar({ providers, value, onChange }) {
  return (
    <div className="providerBar">
      <span className="ai">AI:</span>
      {providers.map((p) => (
        <button
          key={p.id}
          className={`providerChip${value === p.id ? ' active' : ''}`}
          onClick={() => onChange(p.id)}
        >
          {p.name}
          <span className={`lbl${p.free ? ' free' : ''}`}>{p.label}</span>
        </button>
      ))}
    </div>
  );
}
window.ProviderBar = ProviderBar;
