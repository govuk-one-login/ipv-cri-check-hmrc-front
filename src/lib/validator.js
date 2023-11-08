const isValidNino = (value) => {
  return value.match(
    "" ||
      /^(?!BG|GB|KN|NK|NT|TN|ZZ)[ABCEGHJKLMNOPRSTWXYZ][ABCEGHJKLMNPRSTWXYZ][0-9]{6}[ABCD]$/i
  );
};

module.exports = { isValidNino };
