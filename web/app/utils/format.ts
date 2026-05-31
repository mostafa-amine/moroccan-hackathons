// Date helpers, auto-imported by Nuxt.

function d(iso: string): Date {
  return new Date(iso + 'T00:00:00')
}

/** "10 July 2026" · "6–7 June 2026" · "29 Jan – 2 Feb 2026" */
export function formatDateRange(start: string, end?: string | null): string {
  const s = d(start)
  if (!end || end === start) {
    return s.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  const e = d(end)
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()
  if (sameMonth) {
    return `${s.getDate()}–${e.getDate()} ${e.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    })}`
  }
  const short = (x: Date) =>
    x.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  return `${short(s)} – ${short(e)}`
}

/** Whole days from today to `start` (negative if past). */
export function daysUntil(start: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((d(start).getTime() - today.getTime()) / 86_400_000)
}

/** "31 May 2026" */
export function niceDate(iso: string): string {
  return d(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
