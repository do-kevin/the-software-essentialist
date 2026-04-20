import { fizzBuzz } from '../../utils/fizzbuzzGame';

describe('FizzBuzz', () => {
  it('should return "Fizz" when it receives 3', () => {
    const result = fizzBuzz(3);

    expect(result).toBe('Fizz');
  });

  it('should return "Buzz" when it receives 5', () => {
    const result = fizzBuzz(5);

    expect(result).toBe('Buzz');
  });

  it('should return "Buzz" when it receives 5', () => {
    const result = fizzBuzz(15);

    expect(result).toBe('FizzBuzz');
  });
});
