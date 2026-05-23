# Clinician Dashboard — UI Kit

Audience: doctors, ward nurses, ICU staff.

## What's in scope
- **Patient roster + detail split view** (`index.html`) — default screen. Picks patient from list, drills into vitals, labs, notes, orders.
- **Vital cards with sparklines** — the house style for numerical readouts.
- **Lab result table** — reference-range aware, colour-coded by tone token, tabular numerals.
- **Active medications strip** — simple list with inline add.

## Components
| File | Exports |
|---|---|
| `../_shared/Primitives.jsx` | `Icon`, `Avatar`, `Badge`, `Button`, `Card`, `Sparkline`, `Logo` |
| `Chrome.jsx` | `Sidebar`, `TopBar`, `SearchBar` |
| `Patient.jsx` | `PatientList`, `VitalCard`, `PatientDetail` |

## Copywriting notes
- Ukrainian-first. Latin units preserved (`HbA1c`, `SpO₂`, `°C`).
- Ввічливе «Ви». No exclamation marks. No emoji.
- Lab values show value + reference range + timestamp.
