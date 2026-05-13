import { StatsCalculator } from '../../utils/statsCalculator';

describe('Stats Calculator', () => {
  it('should determine the minimum value is -8 from [2, 4, 21, -8, 53, 40]', () => {
    const statsCalculator = new StatsCalculator();

    const result = statsCalculator.calculate([2, 4, 21, -8, 53, 40]);
    expect(result.minVal).toBe(-8);
  });

  it('should determine the minimum value is -1 from [1, 2, 3, 4, 5, -1]', () => {
    const statsCalculator = new StatsCalculator();

    const result = statsCalculator.calculate([1, 2, 3, 4, 5, -1]);
    expect(result.minVal).toBe(-1);
  });
});
