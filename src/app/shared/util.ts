import dayjs from 'dayjs';

export class Util {}

export function isToday(created: Date) {
  return dayjs(created).isSame(dayjs().startOf('day'), 'd');
}

export function isYesterday(created: Date) {
  return dayjs(created).isSame(dayjs().subtract(1, 'day').startOf('day'), 'd');
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function removeHttp(url: string): string {
  return url.replace(/^https?:\/\//, '');
}
