import BooleanCalculator from '../../utils/booleanCalculator';

describe('Boolean Calculator', () => {
  let booleanCalculator: BooleanCalculator;

  beforeEach(() => {
    booleanCalculator = new BooleanCalculator();
  });

  it('should determine "TRUE AND TRUE" is true', () => {
    const result = booleanCalculator.evaluate('TRUE AND TRUE');

    expect(result).toBeTruthy();
  });

  it('should determine "TRUE AND FALSE" is false', () => {
    const result = booleanCalculator.evaluate('TRUE AND FALSE');

    expect(result).toBeFalsy();
  });

  it('should determine "TRUE OR FALSE" is true', () => {
    const result = booleanCalculator.evaluate('TRUE OR FALSE');

    expect(result).toBeTruthy();
  });

  it('should determine "TRUE AND TRUE AND FALSE" is false', () => {
    const result = booleanCalculator.evaluate('TRUE AND TRUE AND FALSE');

    expect(result).toBeFalsy();
  });

  it('should determine "TRUE AND TRUE AND FALSE OR FALSE" is false', () => {
    const result = booleanCalculator.evaluate(
      'TRUE AND TRUE AND FALSE OR FALSE',
    );

    expect(result).toBeFalsy();
  });

  it('should determine "TRUE AND (FALSE OR TRUE)" is true', () => {
    const result = booleanCalculator.evaluate('TRUE AND (FALSE OR TRUE)');

    expect(result).toBeTruthy();
  });

  it('should throw error when "TRUE AND FALSE)" is inputted', () => {
    expect(() => {
      const result = booleanCalculator.evaluate('TRUE AND FALSE)');
    }).toThrow('Syntax Error: Unmatched closing parenthesis.');
  });

  it('should determine "(TRUE  AND  FALSE) OR (FALSE OR TRUE)" is true', () => {
    const result = booleanCalculator.evaluate(
      '(TRUE  AND  FALSE) OR (FALSE OR TRUE)',
    );

    expect(result).toBeTruthy();
  });

  it('should determine "TRUE OR TRUE OR TRUE AND FALSE" is true', () => {
    const result = booleanCalculator.evaluate('TRUE OR TRUE OR TRUE AND FALSE');

    expect(result).toBeTruthy();
  });

  it('should determine "TRUE OR FALSE AND NOT FALSE" is true', () => {
    const result = booleanCalculator.evaluate('TRUE OR FALSE AND NOT FALSE');

    expect(result).toBeTruthy();
  });
});
