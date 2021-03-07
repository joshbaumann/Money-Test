import Money from '../src/money';

describe('Money', () => {
  [
    { input: 0, result: 'zero dollars' },
    { input: 1, result: 'one dollar' },
    { input: 0.12, result: 'twelve cents' },
    { input: 0.01, result: 'one cent' },
    { input: 10.55, result: 'ten dollars and fifty-five cents' },
    { input: 120, result: 'one hundred and twenty dollars' },
    { input: 100.05, result: 'one hundred dollars and five cents' },
    { input: 1000, result: 'one thousand dollars' },
    { input: 22000, result: 'twenty-two thousand dollars' },
    { input: 268002, result: 'two hundred and sixty-eight thousand two dollars' },
    { input: 268002.89, result: 'two hundred and sixty-eight thousand two dollars and eighty-nine cents' },
    { input: 12345689, result: 'twelve million three hundred and forty-five thousand six hundred and eighty-nine dollars' },
    { input: 10000000, result: 'ten million dollars' },
    { input: 100000000, result: 'one hundred million dollars' },
    { input: 1000000000, result: 'one billion dollars' },
    { input: 1000000000.02, result: 'one billion dollars and two cents' }
  ].forEach((test) => {
    it(`outputs "${test.result}" when input is "${test.input}"`, () => {
      expect(Money(test.input)).toEqual(test.result);
    });
  });
});
