import { fizzBuzz } from '../../utils/fizzbuzzGame';

describe('FizzBuzz', () => {
  it.each([3, 9, 42, 102, -12])(
    'should return "Fizz" when input is multiple of 3',
    (value) => {
      const result = fizzBuzz(value);
      expect(result).toBe('Fizz');
    },
  );

  it('should return "Buzz" when it receives 5', () => {
    const result = fizzBuzz(5);

    expect(result).toBe('Buzz');
  });

  it.each([15, 45])(
    "should return 'FizzBuzz' when the input is a multiple of both 3 and 5",
    (value) => {
      const result = fizzBuzz(value);
      expect(result).toBe('FizzBuzz');
    },
  );

  it('should return "43" when it receives 43', () => {
    const result = fizzBuzz(43);

    expect(typeof result).toBe('string');
    expect(result).toBe('43');
  });

  it("should return the number as a string if it's not divisble by 3 or 5 such as 41.0", () => {
    const result = fizzBuzz(41.0);

    expect(result).toBe('41');
  });

  it('should throw error if input is a non-number such as a string', () => {
    expect(() => {
      fizzBuzz('41');
    }).toThrow('Received is not of type "number"');
  });

  it('should throw error if input is null', () => {
    expect(() => {
      fizzBuzz(null);
    }).toThrow('Received is not of type "number"');
  });

  it('should throw error if input is undefined', () => {
    expect(() => {
      fizzBuzz(undefined);
    }).toThrow('Received is not of type "number"');
  });
});
