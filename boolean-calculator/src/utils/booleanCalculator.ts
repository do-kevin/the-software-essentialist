class BooleanCalculator {
  evaluate = (input: string): boolean => {
    if (input === 'TRUE') {
      return true;
    }

    return false;
  };
}

export default BooleanCalculator;
