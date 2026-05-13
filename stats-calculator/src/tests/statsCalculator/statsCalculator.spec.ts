import { StatsCalculator } from '../../utils/statsCalculator';

describe('Stats Calculator', () => {
  let statsCalculator: StatsCalculator;

  beforeEach(() => {
    statsCalculator = new StatsCalculator();
  });

  it('should determine the minimum value is -8 from [2, 4, 21, -8, 53, 40]', () => {
    const result = statsCalculator.calculate([2, 4, 21, -8, 53, 40]);
    expect(result.minVal).toBe(-8);
  });

  it('should determine the minimum value is -1 from [1, 2, 3, 4, 5, -1]', () => {
    const result = statsCalculator.calculate([1, 2, 3, 4, 5, -1]);
    expect(result.minVal).toBe(-1);
  });

  it('should determine the maximum value is 53 from [2, 4, 21, -8, 53, 40]', () => {
    const result = statsCalculator.calculate([2, 4, 21, -8, 53, 40]);
    expect(result.maxVal).toBe(53);
  });

  it('should determine the minimum value is -1 from [1, 2, 3, 4, 5, -1]', () => {
    const result = statsCalculator.calculate([1, 2, 3, 4, 5, -1]);
    expect(result.maxVal).toBe(5);
  });

  it('should count that there is 6 numbers in [2, 4, 21, -8, 53, 40]', () => {
    const result = statsCalculator.calculate([2, 4, 21, -8, 53, 40]);
    expect(result.numOfElements).toBe(6);
  });
});
