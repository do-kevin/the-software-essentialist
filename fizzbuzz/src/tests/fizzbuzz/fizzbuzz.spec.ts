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

  it('should return "Fizz" when it receives 9', () => {
    const result = fizzBuzz(9);

    expect(result).toBe('Fizz');
  });

  it('should return "43" when it receives 43', () => {
    const result = fizzBuzz(43);

    expect(typeof result).toBe('string');
    expect(result).toBe('43');
  });

  it('should return "Fizz" when it receives 42', () => {
    const result = fizzBuzz(42);

    expect(result).toBe('Fizz');
  });

  it('should return "FizzBuzz" when it receives 45', () => {
    const result = fizzBuzz(45);

    expect(result).toBe('FizzBuzz');
  });

  it('should return "Fizz" when it receives 102', () => {
    const result = fizzBuzz(102);

    expect(result).toBe('Fizz');
  });

  it('should return "Fizz" when it receives -12', () => {
    const result = fizzBuzz(-12);

    expect(result).toBe('Fizz');
  });

  it('should number in string if not divisble by 3 or 5', () => {
    const result = fizzBuzz(41.0);

    expect(result).toBe('41');
  });

  it('should throw error if given a non-number', () => {
    expect(() => {
      fizzBuzz('41');
    }).toThrow('Received is not of type "number"');
  });

  it('should throw error if given null or undefined', () => {
    expect(() => {
      fizzBuzz(null);
    }).toThrow('Received is not of type "number"');

    expect(() => {
      fizzBuzz(undefined);
    }).toThrow('Received is not of type "number"');
  });
});
