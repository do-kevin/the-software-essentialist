import BooleanCalculator from '../../utils/booleanCalculator';

describe('Boolean Calculator', () => {
  let booleanCalculator: BooleanCalculator;

  beforeEach(() => {
    booleanCalculator = new BooleanCalculator();
  });

  it('should determine "TRUE" is true', () => {
    const result = booleanCalculator.evaluate('TRUE');

    expect(result).toBeTruthy();
  });

  it('should determine "FALSE" is false', () => {
    const result = booleanCalculator.evaluate('FALSE');

    expect(result).toBeFalsy();
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
});
