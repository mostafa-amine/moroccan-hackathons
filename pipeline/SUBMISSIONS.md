# Submissions: form → queue → merge

People who spot a hackathon (often on Instagram/LinkedIn) submit it through a hosted form.
Submissions are **leads, not published facts**. They sit in a pending queue until the
weekly run verifies them. This is also the spam filter: nothing reaches the live site
unvetted.

## Lifecycle

```
  Hosted form  ──▶  responses sheet  ──▶  data/submissions-pending.json  ──▶  weekly run
   (Tally)          (export/paste)            (pending queue)               verifies & merges
                                                                                 │
                                                              ┌──────────────────┴───────────────┐
                                                          merged into                       rejected
                                                       hackathons.json                  (reason logged)
```

## The form (Tally, recommended)

Tally is free, needs no account to submit, and exports to CSV/Sheets. Create a form with
these fields (keep it short; friction kills submissions):

| Field                | Type            | Required | Notes                                        |
|----------------------|-----------------|----------|----------------------------------------------|
| Event name           | short text      | ✅       |                                              |
| Link / source        | URL             | ✅       | The post or page where they saw it. Critical: no link means we can't verify. |
| City                 | short text      | ✅       | Or "Online / hybrid"                         |
| Dates (if known)     | short text      | No       | Free text; we confirm against the source     |
| Organizer            | short text      | No       |                                              |
| Anything else?       | long text       | No       | Theme, cost, deadline, etc.                  |
| Your name / handle   | short text      | No       | For optional `submitted_by` credit           |

> Once the form exists, drop its public URL into `README.md` and onto the site.

## Feeding the queue

Each run, export new form responses and add them to the `pending` array in
`data/submissions-pending.json`. Minimal shape per item:

```json
{
  "name": "...",
  "link": "https://...",
  "city": "...",
  "dates_text": "...",
  "organizer": "...",
  "notes": "...",
  "submitted_by": "...",
  "received": "YYYY-MM-DD"
}
```

The weekly run (`RESEARCH.md`, Step 1) reads these, verifies each, then merges or rejects.
After the run, **clear processed items** from the queue so it doesn't reprocess them.

## Alternative: GitHub issue form

If you later want a developer-friendly path too, add an issue template
(`.github/ISSUE_TEMPLATE/submit-hackathon.yml`) with the same fields. The run reads open
issues labeled `submission` and closes them once processed. (Higher friction, since it
requires a GitHub account, so the hosted form stays the primary channel.)
