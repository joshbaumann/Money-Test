import { CARDINAL_NUMERAL_MAPPING, UNIT_MAPPING } from './money-words';

export default (amount: number): string | null => {
  const dollars = Math.trunc(Math.abs(amount));
  const cents = Math.round((amount * 100) - (dollars * 100));

  const groups = groupByThousands(dollars);

  if (dollars <= 0 && cents) {
    return `${convertNumberToWords(cents)} ${pluralize(cents, 'cent')}`;
  } else {
    const result = groups
      .map((group) => parseInt(group, 10))
      .map(convertNumberToWords)
      .map(addUnitToWords)
      .filter(Boolean)
      .concat(pluralize(dollars, 'dollar'));

    if (cents) {
      result.push(`and ${convertNumberToWords(cents)} ${pluralize(cents, 'cent')}`);
    }

    return result.join(' ');
  }

  function addUnitToWords(words: string, index: number): string {
    const hasUnitWord = index < groups.length - 1 && words;
    const unit = UNIT_MAPPING[groups.length - (index + 1)];

    return hasUnitWord ? `${words} ${unit.value}` : words;
  }

  function convertNumberToWords(numeral: number): string {
    if (numeral < 20) {
      return findWordForNumeral(numeral);
    } else if (numeral < 100) {
      const digits = numeral % 10;
      return [
        findWordForNumeral(~~(numeral / 10) * 10),
        digits ? findWordForNumeral(digits) : null
      ].filter(Boolean).join('-');
    } else if (numeral) {
      const digits = numeral % 100;
      return [
        `${findWordForNumeral(~~(numeral / 100))} hundred`,
        digits ? convertNumberToWords(digits) : null
      ].filter(Boolean).join(' and ');
    } else {
      return '';
    }
  }

  function findWordForNumeral(numeral: number): string {
    return CARDINAL_NUMERAL_MAPPING.find(o => o.number === numeral)?.value || '';
  }

  function groupByThousands(numeral: number): string[] {
    const reversedNumber = reverse(String(numeral))
    const groups = reverse(reversedNumber.replace(/(\d{3})/g, '$1 ')).trim().split(' ');

    // Resolve "000" groups to nothing as word conversion is not required
    return groups.map((group) => group === '000' ? '' : group);
  }

  function reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  function pluralize(count: number, word: string, suffix: string = 's') {
    return count === 1 ? word : `${word}${suffix}`;
  }
}
