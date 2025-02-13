const isValidNino = (value) => {
  return value
    .replaceAll(" ", "")
    .toUpperCase()
    .match(/^[A-Z]{2}[0-9]{6}[A-Z]{1}$/);
};

const invalidCharacters = (value) => {
  return value
    .replaceAll(" ", "")
    .toUpperCase()
    .match(
      /^(BG|GB|KN|NK|NT|TN|ZZ)|^[DFIQUV][A-Z]|^[A-Z][DFIQUV]|^[A-Z]O|^[0-9]{6}[^ABCD]$/
    );
};

module.exports = { isValidNino, invalidCharacters };
