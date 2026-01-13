export function getTodayISO(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseISO(dateStr: string): Date {
  // Use UTC to avoid timezone shifts when working with date-only strings
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function toISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function addDays(date: string | Date, days: number): string {
  const d = typeof date === 'string' ? parseISO(date) : new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return toISO(d);
}

export function diffDays(start: string, end: string): number {
  const d1 = parseISO(start);
  const d2 = parseISO(end);
  const diffTime = d2.getTime() - d1.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export function getStartOfWeek(date: string): string {
  const d = parseISO(date);
  const day = d.getUTCDay(); // 0 is Sunday
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  d.setUTCDate(diff);
  return toISO(d);
}

export function getStartOfMonth(date: string): string {
  const [year, month] = date.split('-');
  return `${year}-${month}-01`;
}

export function getNextMonth(date: string): string {
  const d = parseISO(getStartOfMonth(date));
  d.setUTCMonth(d.getUTCMonth() + 1);
  return toISO(d);
}

export function formatHeaderLabel(dateStr: string, zoomLevel: 'day' | 'week' | 'month'): string {
  const date = parseISO(dateStr);
  const options: Intl.DateTimeFormatOptions = { timeZone: 'UTC' };

  if (zoomLevel === 'day') {
    options.day = 'numeric';
    options.weekday = 'short';
  } else if (zoomLevel === 'week') {
    options.month = 'short';
    options.day = 'numeric';
  } else {
    options.month = 'short';
    options.year = 'numeric';
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
