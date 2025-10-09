// eslint-disable-next-line no-unused-vars
const checkLength = (string, maxLength) => string.length <= maxLength;

// eslint-disable-next-line no-unused-vars
function checkPalindrome(string) {
  const cleanString = string.replaceAll(' ', '').toLowerCase();
  return cleanString === cleanString.split('').reverse().join('');
}

// eslint-disable-next-line no-unused-vars
function getNumberFromString(input) {
  const digits = String(input).replace(/\D/g, '');
  return digits ? Number(digits) : NaN;
}

function isMeetingInTime(workStart, workEnd, meetingStart, meetingDuration) {
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return workStartMinutes <= meetingStartMinutes && meetingEndMinutes <= workEndMinutes;
}

// eslint-disable-next-line no-console
console.log(isMeetingInTime('08:00', '17:30', '14:00', 90),
  isMeetingInTime('8:0', '10:0', '8:0', 120),
  isMeetingInTime('08:00', '14:30', '14:00', 90),
  isMeetingInTime('14:00', '17:30', '08:0', 90),
  isMeetingInTime('8:00', '17:30', '08:00', 900));
