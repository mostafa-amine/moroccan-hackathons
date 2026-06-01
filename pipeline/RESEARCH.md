# Daily Research Run Playbook

> **How to run:** Open Claude Code in this repo and say: *"Run the daily research from
> `pipeline/RESEARCH.md`."* Claude executes the steps below and updates
> `data/hackathons.json`. Aim for roughly once a day.

The job: keep `data/hackathons.json` an accurate, deduplicated, verified list of
**upcoming hackathons in Morocco**. Two inputs (the pending submissions queue plus a fresh
web sweep) pass through one verification gate.

---

## Hard rules (read first; these protect trust)

1. **Never invent** an event, a date, a venue, or a URL. If it isn't in a source you
   actually saw, it does not go in.
2. **Every entry needs ≥1 working source URL** in `sources[]`. No source → not added.
3. If dates can't be confirmed against a source, set `dates_confirmed: false`.
4. Prefer the **official organizer page** over aggregators or news write-ups; keep both
   in `sources[]` when available.
5. When unsure whether something qualifies (scope) or is real, **leave it out** and note
   it in the run summary rather than guessing.

---

## Step 1: Ingest the submissions queue

Read `data/submissions-pending.json`. Each pending item is a human-submitted candidate.
Treat it exactly like a web-sweep candidate: it still must pass verification (Step 3).
A submission is a *lead*, not a fact.

## Step 2: Web sweep

Run searches and check known sources. Suggested queries (vary them; try French + Arabic):

- `hackathon Maroc 2026`, `hackathon Morocco upcoming`, `hackathon Casablanca / Rabat / Marrakech / Tanger`
- `datathon Maroc`, `hack day Morocco`, `concours développeurs Maroc`
- `<theme> hackathon Morocco` for AI, fintech, health, climate, agritech

Known source types worth checking directly:

- **Aggregators:** Devpost, MLH, Eventbrite, Meetup, Luma
- **Universities / schools:** UM6P, Al Akhawayn, ENSIAS, ENSA network, EMSI, 1337 / 42 Network, INPT, ENCG
- **Communities:** Geeks Blabla, Morocco AI, GDG (Casablanca/Rabat), local IEEE student branches, Technopark
- **Ecosystem/news:** local tech press, accelerator and incubator pages

**Sweep social media too; it works.** Public Instagram (and often Facebook/LinkedIn)
posts *are* indexed and reachable:

1. Run an Instagram-scoped search using `WebSearch` with `allowed_domains: ["instagram.com"]`
   on queries like `hackathon Morocco 2026`, `hackathon Maroc`. Caption text comes back in
   the result titles.
2. For promising **single-post** URLs (the `/p/...` form, which extracts far better than
   profile/grid pages), `WebFetch` the post to pull dates, venue, organizer, and any
   registration link.
3. Watch recency hard here: search surfaces popular/old posts, so many hits are *past*
   editions or results recaps. Confirm the date in Step 3 and age out in Step 5.

Collect candidates with their source URLs. Don't filter yet; that's the next step.

## Step 3: Verify each candidate (the gate)

For every candidate (submission or web-found), confirm ALL of:

- [ ] **Real:** a live source URL actually describes this event.
- [ ] **In scope (place):** physically in Morocco, or hybrid with a Morocco in-person leg.
- [ ] **In scope (time):** upcoming or ongoing (end date today or later).
- [ ] **In scope (type):** a hackathon / datathon / hack day / build-focused competition
      (not a generic conference, talk series, or recurring meetup).

Capture dates exactly as the source states them. Approximate/"coming soon" → record what's
known and set `dates_confirmed: false`.

Candidates that fail → exclude. Note rejections (with the reason) in the run summary.

## Step 4: Deduplicate

An event often appears in several places. Before adding, check it against existing entries
**and** against other candidates in this same run.

**Match if** normalized name is similar **AND** (date ranges overlap **OR** start dates are
within ~3 days) **AND** city matches.
- Normalize name: lowercase, strip punctuation/accents, drop year and edition words
  ("2026", "v2", "edition").

On a match → **merge, don't duplicate:**
- Add any new URL to `sources[]` (this is how multi-platform listings collapse into one).
- Fill empty fields; prefer the most authoritative / freshest value for conflicts.
- Update `last_verified` to today.

## Step 5: Age out past events

Any entry whose `end_date` (or `start_date` if single-day) is before today is out of scope
(upcoming-only). Remove it.

## Step 6: Write the dataset

- Build/refresh each entry per `schema.json` (validate against it).
- Generate `id` as a stable slug: `<year>-<city>-<short-name>`, all lowercase. Never
  recycle an id.
- Sort `hackathons` by `start_date` ascending.
- Set `generated_at` and `count`. Set `last_verified` (and `added` for new entries) to today.

## Step 7: Report

End with a short summary:

- **Added:** N (names)
- **Updated / merged:** N (names + what changed)
- **Rejected:** N (name → reason)
- **Aged out:** N
- **Unchanged:** N
- **Queue:** which pending submissions were merged vs. rejected (so they can be cleared).

---

### A note on social media

Public Instagram/Facebook/LinkedIn posts **are** reachable from the sweep: search indexes
them and `WebFetch` can usually extract single-post (`/p/...`) content, so tag these
`instagram` / `facebook` / `linkedin` in `sources[]`. Known limits, so the form still
earns its place as a complement: fetches aren't 100% reliable (occasional login wall /
rate-limit), search skews toward older popular posts (recency check matters), and
Stories / Reels / private accounts can't be read. The submission form covers exactly those
gaps: fresh posts not yet indexed, and content the fetch can't see.
