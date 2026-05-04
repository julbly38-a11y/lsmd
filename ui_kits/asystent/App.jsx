// ChatArea + InputDock + the App that ties it together.
const { useState: useStateApp, useRef: useRefApp, useEffect: useEffectApp } = React;

function ChatArea({ messages, loading }) {
  const bottomRef = useRefApp(null);
  useEffectApp(() => { bottomRef.current?.scrollTo({top: 1e9, behavior: 'smooth'}); }, [messages, loading]);

  return (
    <div className="chatArea" ref={bottomRef}>
      {messages.length === 0 && (
        <div className="welcome">
          <div className="welcomeIcon">+</div>
          <h1>Медичний AI Асистент</h1>
          <p>Запитуйте про госпіталізації, пацієнтів, лікарів, діагнози та статистику лікарні — відповідаю даними з бази.</p>
        </div>
      )}
      {messages.map((m, i) => (
        m.role === 'user'
          ? <UserBubble key={i}>{m.content}</UserBubble>
          : <AgentBubble key={i} msg={m} />
      ))}
      {loading && <TypingBubble />}
    </div>
  );
}

function InputDock({ value, onChange, onSend, loading }) {
  return (
    <div className="inputArea">
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        placeholder="Запитайте про дані лікарні..."
        disabled={loading}
      />
      <button className="sendBtn" onClick={onSend} disabled={loading || !value.trim()}>→</button>
    </div>
  );
}

function App() {
  const D = window.LSMD_DATA;
  const [messages, setMessages] = useStateApp([]);
  const [input, setInput] = useStateApp('');
  const [loading, setLoading] = useStateApp(false);
  const [provider, setProvider] = useStateApp('groq');
  const [stats, setStats] = useStateApp({ count: 0, tokensIn: 0, tokensOut: 0, cost: 0 });
  const [limits] = useStateApp({ requests_remaining: 14987, requests_limit: 15000, tokens_remaining: 472183, tokens_limit: 500000 });

  function send(question) {
    const q = (question ?? input).trim();
    if (!q || loading) return;
    setInput('');
    setMessages((p) => [...p, { role: 'user', content: q }]);
    setLoading(true);

    setTimeout(() => {
      const resp = D.responses[q] || D.defaultResponse;
      const tIn = 800 + Math.floor(Math.random() * 600);
      const tOut = 60 + Math.floor(Math.random() * 200);
      const prov = D.providers.find((p) => p.id === provider);
      const cost = prov.free ? 0 : (tIn / 1000000) * (prov.id === 'anthropic' ? 3 : 0.15) + (tOut / 1000000) * (prov.id === 'anthropic' ? 15 : 0.6);
      setMessages((p) => [...p, {
        role: 'assistant',
        explanation: resp.explanation,
        sql: resp.sql,
        rows: resp.rows,
        tokens: { provider: prov.name, tokens_in: tIn, tokens_out: tOut, tokens_total: tIn + tOut, cost_usd: cost, free: prov.free },
      }]);
      setStats((s) => ({ count: s.count + 1, tokensIn: s.tokensIn + tIn, tokensOut: s.tokensOut + tOut, cost: s.cost + cost }));
      setLoading(false);
    }, 700);
  }

  return (
    <div className="layout">
      <Sidebar examples={D.examples} onPick={send} stats={stats} limits={limits} provider={provider} />
      <main className="main">
        <ProviderBar providers={D.providers} value={provider} onChange={setProvider} />
        <ChatArea messages={messages} loading={loading} />
        <InputDock value={input} onChange={setInput} onSend={() => send()} loading={loading} />
      </main>
    </div>
  );
}

window.App = App;
