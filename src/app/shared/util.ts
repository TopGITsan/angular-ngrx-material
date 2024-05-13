import dayjs from "dayjs";

export class Util {

}

export function isToday(created: Date) {
  return dayjs(created).isSame(dayjs().startOf('day'), 'd');
}

export function isYesterday(created: Date) {
  return dayjs(created).isSame(dayjs().subtract(1, 'day').startOf('day'), 'd')
}
