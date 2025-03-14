const {
  isValidNino,
  invalidCharacters,
} = require("../../../../src/lib/validator");
const { expect } = require("chai");

const good_edge_case_ninos = [
  "CA283902A",
  "EA283902A",
  "GA283902A",
  "HA283902A",
  "JA283902A",
  "PA283902A",
  "RA283902A",
  "TA283902A",
  "WA283902A",
  "AC283902A",
  "AE283902A",
  "AG283902A",
  "AH283902A",
  "AJ283902A",
  "AN283902A",
  "AP283902A",
  "AR283902A",
  "AT283902A",
  "AW283902A",
  "AA283902A",
  "AA283902B",
  "AA283902C",
  "AA283902D",
  "AA 28 39 02 D",
  "aa 28 39 02 d",
  "aa283902d",
];

const bad_prefixes_ninos = [
  "DA283902A",
  "FA283902A",
  "IA283902A",
  "QA283902A",
  "UA283902A",
  "VA283902A",
  "AD283902A",
  "AF283902A",
  "AI283902A",
  "AO283902A",
  "AQ283902A",
  "AU283902A",
  "AV283902A",
];
const bad_unused_prefixes_ninos = [
  "BG283902A",
  "GB283902A",
  "KN283902A",
  "NK283902A",
  "NT283902A",
  "TN283902A",
  "ZZ283902A",
];
const bad_suffixes_ninos = ["AA2839020", "AA283902E"];
const bad_length_ninos = [
  "AAA283902A",
  "AA283902AA",
  "AA2839021A",
  "AA2839021AA",
  "AAA2839021A",
  "22333333A",
  "A283902A",
  "283902A",
  "AA283902",
  "A283902",
  "283902",
  "AA83902A",
  "AA2A",
  "AAA",
  "AA",
  "A",
  "",
  "abc def",
  "a b c d e f",
  "ab1cd 2",
];

describe("should fail all the bad ninos", () => {
  test.each(bad_prefixes_ninos)(
    "given bad prefix nino of %p, returns false",
    (ninoArg) => {
      const invalidCharResult = invalidCharacters(ninoArg);

      expect(invalidCharResult).to.be.false;
    }
  );
  test.each(bad_unused_prefixes_ninos)(
    "given unused prefix nino of %p, returns false",
    (ninoArg) => {
      const invalidCharResult = invalidCharacters(ninoArg);

      expect(invalidCharResult).to.be.false;
    }
  );
  test.each(bad_suffixes_ninos)(
    "given bad suffix nino of %p, returns false",
    (ninoArg) => {
      const invalidCharResult = invalidCharacters(ninoArg);

      expect(invalidCharResult).to.be.false;
    }
  );
  test.each(bad_length_ninos)(
    "given bad length nino of %p, returns false",
    (ninoArg) => {
      const result = isValidNino(ninoArg);

      expect(result).to.be.false;
    }
  );
});

describe("should return all the good ninos", () => {
  test.each(good_edge_case_ninos)(
    "isValidNino returns true for the given nino of %p",
    (ninoArg) => {
      const result = isValidNino(ninoArg);

      expect(result).to.be.true;
    }
  );
  test.each(good_edge_case_ninos)(
    "invalidCharacters returns true for the given nino of %p",
    (ninoArg) => {
      const result = invalidCharacters(ninoArg);

      expect(result).to.be.true;
    }
  );
});
