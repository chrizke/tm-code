/**
 * Formatter to import date strings in dash format Year-Month-Day
 */
export function DashDateFormatter() {
  return (value: string) => {
    const regex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
    const match = value.match(regex);
    if (match && match.groups) {
      const groups = match.groups;
      return new Date(`${groups['year']}-${groups['month']}-${groups['day']}T00:00:00Z`);
    } else {
      return null;
    }
  }
}


/**
 * Formatter to import date strings in slash format Month/Day/Year
 */
export function SlashDateFormatter() {
  return (value: string) => {
    const regex = /^(?<month>\d{1,2})\/(?<day>\d{1,2})\/(?<year>\d{4})$/
    const match = value.match(regex);
    if (match && match.groups) {
      const groups = match.groups;
      return new Date(`${groups['year']}-${groups['month'].padStart(2, '0')}-${groups['day'].padStart(2, '0')}T00:00:00Z`);
    } else {
      return null;
    }
  }
}

/**
 * Formatter to import an array by splitting a delimiter separated list
 * @param delimiter List delimiter
 */
export function StringArrayFormatter(delimiter = ', ') {
  return (value: string) => value.split(delimiter);
}


/**
 * Formatter to import a boolean.
 * Is false if value is 'Opted-Out', true otherwiese.
 */
export function OptedOutFormatter() {
  return (value: string) => value !== 'Opted-out';
}