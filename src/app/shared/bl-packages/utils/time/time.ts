import {
  addDays,
  endOfMonth,
  endOfWeek,
  endOfYear,
  parse,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
// import endOfMonth from 'date-fns/end_of_month';
// import endOfWeek from 'date-fns/end_of_week';
// import endOfYear from 'date-fns/end_of_year';
// import parse from 'date-fns/parse';
// import startOfMonth from 'date-fns/start_of_month';
// import startOfWeek from 'date-fns/start_of_week';
// import startOfYear from 'date-fns/start_of_year';
// import subMonths from 'date-fns/sub_months';
// import subWeeks from 'date-fns/sub_weeks';
// import subYears from 'date-fns/sub_years';

/**
 * Get time range
 * @param type type with `-` for the past time, if `number` is specified for days
 * @param time start time
 */
export function getTimeDistance(
  type:
    | 'today'
    | '-today'
    | 'week'
    | '-week'
    | 'month'
    | '-month'
    | 'year'
    | '-year'
    | number,
  time?: Date | string | number | any,
): [Date, Date] {
  time = parse(time || new Date());

  switch (type) {
    case 'today':
      return [time, time];
    case '-today':
      return [addDays(time, -1), time];
    case 'week':
      return [startOfWeek(time), endOfWeek(time)];
    case '-week':
      return [startOfWeek(subWeeks(time, 1)), endOfWeek(subWeeks(time, 1))];
    case 'month':
      return [startOfMonth(time), endOfMonth(time)];
    case '-month':
      return [startOfMonth(subMonths(time, 1)), endOfMonth(subMonths(time, 1))];
    case 'year':
      return [startOfYear(time), endOfYear(time)];
    case '-year':
      return [startOfYear(subYears(time, 1)), endOfYear(subYears(time, 1))];
    default:
      return type > 0
        ? [time, addDays(time, type)]
        : [addDays(time, type), time];
  }
}
