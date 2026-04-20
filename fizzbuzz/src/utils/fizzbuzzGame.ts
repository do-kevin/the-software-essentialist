export const fizzBuzz = (value: any) => {
  if (typeof value !== 'number') {
    throw new Error('Received is not of type "number"');
  }

  if (value % 5 === 0 && value % 3 === 0) {
    return 'FizzBuzz';
  }

  if (value % 3 === 0) {
    return 'Fizz';
  }

  if (value % 5 === 0) {
    return 'Buzz';
  }

  return value.toString();
};
