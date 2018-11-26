module.exports = (str) => {
  const firstLetter = str.charAt(0).toUpperCase();
  const restString = str.substring(1);

  return `${firstLetter}${restString}`;
};