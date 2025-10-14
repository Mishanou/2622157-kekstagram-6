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
