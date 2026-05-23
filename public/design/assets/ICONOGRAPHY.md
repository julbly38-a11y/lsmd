# Iconography notes

The brand has **no icon set**. Icons are typographic — single Plex Mono characters.

## In production use
| Glyph | Role | Source |
|---|---|---|
| `+` | Logo mark, welcome-screen mark | Plex Mono 300 |
| `→` | Send button | Plex Mono |
| `↓` | Tokens-in (input) | Plex Mono |
| `↑` | Tokens-out (output) | Plex Mono |
| `Σ` | Tokens-total | Plex Mono |
| `▼` | "Show SQL" toggle | Plex Mono |
| `▲` | "Hide SQL" toggle | Plex Mono |
| `○` | Empty result placeholder | Plex Mono |
| `·` | Middle-dot metadata separator | Plex Mono |
| `!` | Error glyph | Plex Mono, in red square |
| `—` | Empty-cell placeholder in tables | Plex Sans/Mono |

## If you need a real icon
Use **Lucide** (https://lucide.dev) at stroke `1.5`, size `16px`, color `currentColor`. This is a substitution — flag it in the design.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="search" style="width:16px;height:16px;stroke-width:1.5"></i>
```

Avoid: emoji, decorative SVG illustrations, multi-color icons, filled glyphs.
