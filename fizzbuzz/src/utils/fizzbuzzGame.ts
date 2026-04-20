export const fizzBuzz = (input: any) => {
  if (typeof input !== 'number') {
    throw new Error('Received is not of type "number"');
  }

  const isDivisble = {
    byThree: input % 3 === 0,
    byFive: input % 5 === 0,
    get byThreeAndFive() {
      return this.byThree && this.byFive;
    },
  };

  if (isDivisble.byThreeAndFive) return 'FizzBuzz';

  if (isDivisble.byThree) return 'Fizz';

  if (isDivisble.byFive) return 'Buzz';

  return input.toString();
};
