/**
 * Converts milliseconds to a string.
 * Only shows milliseconds when the time is less than a minute.
 *
 * @param {number} milliseconds
 * @returns String containing the time e.g. 1:23:40
 */
export function millisecondsToString(milliseconds: number) {
  let str = "";
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  milliseconds = Math.round((milliseconds % 1000) / 10);
  minutes %= 60;
  seconds %= 60;

  // Only show milliseconds when hours and minutes are 0
  if (hours === 0 && minutes === 0) {
    str += seconds + ".";
    if (milliseconds < 10) {
      str += "0";
    }
    str += milliseconds;
  } else {
    let hasHours = false;
    let hasMinutes = false;
    if (hours > 0) {
      hasHours = true;
      str += hours + ":";
    }
    if (minutes > 0) {
      hasMinutes = true;
      if (minutes < 10 && hasHours) {
        str += "0";
      }
      str += minutes + ":";
    } else if (hasHours) {
      str += "00:";
    }

    if (seconds < 10 && (hasMinutes || hasHours)) {
      str += "0";
    }
    str += seconds;
  }

  return str;
}
