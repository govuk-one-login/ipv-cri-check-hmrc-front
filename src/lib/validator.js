const isValidNino = (value) => {
  const formattedValue = value.replaceAll(" ", "").toUpperCase();

  const formatRegex = /^[A-Z]{2}\d{6}[A-Z]$/i;
  return formatRegex.test(formattedValue);
};

const invalidCharacters = (value) => {
  const formattedValue = value.replaceAll(" ", "").toUpperCase();

  const prefixRegex = /^(?:BG|GB|KN|NK|NT|TN|ZZ)/;
  const firstLetterRegex = /^[DFIQUV][A-Z]/;
  const secondLetterRegex = /^[A-Z][DFIQUVO]/;
  const lastLetterRegex = /[A-Z]{2}\d{6}[^ABCD]$/;

  return !(
    prefixRegex.test(formattedValue) ||
    firstLetterRegex.test(formattedValue) ||
    secondLetterRegex.test(formattedValue) ||
    lastLetterRegex.test(formattedValue)
  );
};

module.exports = { isValidNino, invalidCharacters };
