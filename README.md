# Moroccan Hackathons 🇲🇦

A single, trustworthy place to find hackathons happening in Morocco, gathered from
the scattered corners of the web (university pages, Devpost, Eventbrite, news) **and**
crowdsourced from people who spot them on Instagram, Facebook, and LinkedIn.

The data is open. Anyone can submit an event. Nothing goes live until it's verified
against a real source.

## How it works

```
                 ┌─────────────────────┐
   Web sweep ───▶│                     │
  (weekly run)   │  Verification gate  │───▶  data/hackathons.json ───▶  website
                 │  • real source URL? │                                 (static)
 Submissions ───▶│  • in Morocco?      │
 (hosted form)   │  • upcoming?        │
                 │  • duplicate?       │
                 └─────────────────────┘
```

Two inputs, one gate. See [`pipeline/RESEARCH.md`](pipeline/RESEARCH.md) for the weekly
run playbook and [`pipeline/SUBMISSIONS.md`](pipeline/SUBMISSIONS.md) for how submissions
flow in.

## Scope (current)

- **Where:** events physically in Morocco, or hybrid with a Morocco in-person component.
- **When:** upcoming and ongoing only.
- **What:** hackathons, datathons, hack days, and build-focused coding competitions.
- **Not (for now):** purely-online global events with no Morocco tie, generic conferences,
  recurring meetups.

## Repository layout

```
hackathons-morocco/
├── data/
│   ├── hackathons.json          # the source of truth (what the site renders)
│   └── submissions-pending.json # staging queue: unverified submissions
├── pipeline/
│   ├── RESEARCH.md              # the weekly-run playbook Claude follows
│   ├── SUBMISSIONS.md           # hosted-form → queue → merge lifecycle
│   ├── schema.json              # JSON Schema for a hackathon entry
│   └── example-entry.json       # one fully-filled example entry
└── web/                         # the static site (stack TBD)
```

## Contributing

- **Spotted a hackathon?** Use the submission form (link TBD once the site is up).
- **Developer?** Open a PR adding/correcting an entry in `data/hackathons.json`. Keep it
  valid against `pipeline/schema.json` and include a real `sources[].url`.

## Data integrity rules

1. Every entry has at least one working **source URL**.
2. No invented events, dates, or links, ever.
3. Unconfirmed dates are marked `dates_confirmed: false`.
4. Duplicates are merged, not duplicated; the `sources[]` array holds all places it appeared.
