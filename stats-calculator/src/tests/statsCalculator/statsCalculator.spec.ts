describe('Stats Calculator', () => {
  it('should determine the minimum value is -8', () => {
    const result = StatsCalculator.calculate([2, 4, 21, -8, 53, 40]);
    expect(result.minVal).toBe(-8);
  });
});
