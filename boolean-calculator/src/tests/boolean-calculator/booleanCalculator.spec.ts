import BooleanCalculator from '../../utils/booleanCalculator';

describe('Boolean Calculator', () => {
  let booleanCalculator: BooleanCalculator;

  beforeEach(() => {
    booleanCalculator = new BooleanCalculator();
  });

  it('should determine "TRUE" is true', () => {
    const result = booleanCalculator.calculate('');

    expect(result).toBeTruthy();
  });
});
