import { fizzBuzz } from '../../utils/fizzbuzzGame';

describe('FizzBuzz', () => {
  // beforeEach(() => {});

  it('should return "Fizz" when it receives 3', () => {
    const result = fizzBuzz(3);

    expect(result).toBe('Fizz');
  });
});
