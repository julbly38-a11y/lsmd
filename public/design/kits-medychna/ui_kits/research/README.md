# Research Tool — UI Kit

Audience: medical researchers, analysts, epidemiologists.

English-first (this is where analysts work), but cohort facets can include Ukrainian values.

## Screens
- **Cohort Builder + Results** (`index.html`) — left rail assembles inclusion criteria; right panel shows live cohort size (inverted ink card) and aggregate statistics for the current analysis.
- **Histogram** — custom SVG, tone-coded bars with a target band overlay.

## Components
| File | Exports |
|---|---|
| `Cohort.jsx` | `ResearchChrome`, `CohortBuilder`, `Histogram` |

## Notes
- Numbers use English locale (thousands thin-space; decimal point).
- Statistical callouts (p-value, n) always use mono font.
- The `Run analysis` CTA uses Ember — researcher surface, analytical action.
