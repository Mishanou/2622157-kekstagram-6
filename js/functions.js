function checkLength (string, length) {
  return string.length <= length;
}

function checkPolyndrom (string) {
  string.replaceAll(' ', '');
  const reversed = string.split('').reverse().join('');
  return reversed === string;
}

function getNumberFromString(input) {
  const str = String(input);
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!isNaN(parseInt(char, 10))) {
      result += char;
    }
  }

  return result ? parseInt(result, 10) : NaN;
}
