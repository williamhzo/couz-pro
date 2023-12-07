import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import add from 'date-fns/add';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNextSaturdays(limit: number = 15) {
  const today = new Date();
  const nextSaturday = add(new Date(), {
    days: 6 - today.getDay() + 7,
  });

  return Array.from({ length: limit }, (_, i) => {
    return add(new Date(nextSaturday), { days: 7 * i });
  });
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function getWeekendRange(date: Date): string {
  return (
    formatDate(add(date, { days: -1 })) +
    ' - ' +
    formatDate(add(date, { days: 1 }))
  );
}
