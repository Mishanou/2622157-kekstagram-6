const checkLength = (string, maxLength) => string.length <= maxLength;

function checkPalindrome(string) {
  const cleanString = string.replaceAll(' ', '').toLowerCase();
  return cleanString === cleanString.split('').reverse().join('');
}

function getNumberFromString(input) {
  const digits = String(input).replace(/\D/g, '');
  return digits ? Number(digits) : NaN;
}
