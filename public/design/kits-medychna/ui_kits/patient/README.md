# Patient App — UI Kit

Audience: patients managing their own care between visits.

## Screens
- **Home** — greeting, next-visit hero, "results ready" nudge (ember), today's medication & measurement tasks with check-off.
- **Results detail** — plain-language result summary, per-indicator range visualisation, reference ranges.
- **Bottom tab bar** — Home · Results · Visits · Chat · Me.
- Visits/Chat/Me are click-through stubs.

## Components
| File | Exports |
|---|---|
| `Screens.jsx` | `PatientTabBar`, `PatientHome`, `PatientResults`, `PatientPlaceholder` |
| `ios-frame.jsx` | `IOSDevice` (device chrome wrapper) |

## Copywriting
- Ukrainian, ввічливе «Ви».
- Warm but precise — e.g. *«Результати готові. Більшість показників у нормі.»* — no hype, no emoji.
- Medical terms kept; measurements use decimal comma + thin-space thousands.
