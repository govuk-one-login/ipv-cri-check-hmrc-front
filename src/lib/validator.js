const isValidNino = (value) => {
  const formattedValue = value.replaceAll(" ", "").toUpperCase();
  if (formattedValue.length < 9 || formattedValue.length > 9) {
    return null;
  }
  const formatRegex = /^[A-Z]{2}\d{6}[A-Z]$/i;
  if (!formatRegex.test(formattedValue)) {
    return null;
  }
  return formattedValue;
};

const invalidCharacters = (value) => {
  const formattedValue = value.replaceAll(" ", "").toUpperCase();
  if (isValidNino(formattedValue) !== formattedValue) {
    return formattedValue;
  }
  const prefixRegex = /^(?:BG|GB|KN|NK|NT|TN|ZZ)/;
  const firstLetterRegex = /^[DFIQUV][A-Z]/;
  const secondLetterRegex = /^[A-Z][DFIQUVO]/;
  const lastLetterRegex = /[A-Z]{2}\d{6}[^ABCD]$/;

  if (
    prefixRegex.test(formattedValue) ||
    firstLetterRegex.test(formattedValue) ||
    secondLetterRegex.test(formattedValue) ||
    lastLetterRegex.test(formattedValue)
  ) {
    return null;
  }
  return formattedValue;
};

module.exports = { isValidNino, invalidCharacters };
