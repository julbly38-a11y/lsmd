# UI kit · ЛСМД AI Асистент

Pixel-faithful recreation of the chat / analytics surface from `julbly38-a11y/hospital-agent`. Two-column shell: fixed sidebar (logo, examples, session metadata, Groq limits), main column (provider bar, chat area, dock-pinned input).

## Files
- `index.html` — interactive demo. Empty state → click an example or type → fake AI reply with table / stat-grid / single-number / SQL toggle / token badge.
- `Sidebar.jsx` — logo, examples list, DB scale stats, session counters, Groq limits.
- `ProviderBar.jsx` — Groq / Gemini / OpenAI / Anthropic chip selector.
- `ChatArea.jsx` — welcome state, message list, typing indicator, scroll-to-bottom.
- `Bubble.jsx` — user (filled black) and agent (bordered white) bubbles, asymmetric corners.
- `ResultView.jsx` — auto-picks single-number / stat-grid / table layout based on rows.
- `SqlBlock.jsx` — collapsible ▼/▲ SQL toggle.
- `TokenBadge.jsx` — provider / ↓ in / ↑ out / Σ total / cost chip.
- `InputDock.jsx` — pinned input + → send button.
- `data.js` — canned questions and fake AI responses for the demo.

Visuals lifted from `pages/index.js` and `styles/Home.module.css` of the source repo. The fake-data layer is local-only (no real Anthropic / Supabase calls).
