// Race dates are calendar dates at the circuit. They must not move when the viewer is in another timezone.
// `new Date('YYYY-MM-DD')` is UTC midnight, so we always format in UTC: the viewer's timezone is accepted
// for API compatibility but deliberately not used to shift the date.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept so callers can pass the viewer's zone; it must not change the date
export function formatRaceDate(date: string, _viewerTimeZone?: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}
