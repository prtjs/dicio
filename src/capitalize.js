const capitalizeWord = word => word.charAt(0).toUpperCase() + word.substring(1);

const capitalize = string =>
  string
    .split(' ')
    .map(word => (word.length > 2 ? capitalizeWord(word) : word))
    .join(' ');

module.exports = capitalize;
