const isValidNino = (value) => {
  return value
    .replaceAll(" ", "")
    .toUpperCase()
    .match(
      "" ||
        /^(?!BG|GB|KN|NK|NT|TN|ZZ)[ABCEGHJKLMNOPRSTWXYZ][ABCEGHJKLMNPRSTWXYZ][0-9]{6}[ABCD]$/i
    );
};

module.exports = { isValidNino };
