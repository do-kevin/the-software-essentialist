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
});
