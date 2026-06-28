class BooleanCalculator {
  evaluate = (input: string): boolean => {
    input = input.replace(/\s+/g, ' ').trim();

    const operandsAndOperators = input.split(' ');

    const operands = [];
    const operators = [];

    for (let i = 0; i < operandsAndOperators.length; i++) {
      console.log('i: ', i);
      if (operandsAndOperators[i] === 'TRUE') {
        operands.push(true);
      }
      if (operandsAndOperators[i] === 'FALSE') {
        operands.push(false);
      }
      if (operandsAndOperators[i] === 'AND') {
        operators.push('&&');
      }
    }

    console.log('opreands: ', operands);
    console.log('operators: ', operators);

    if (input === 'TRUE') {
      return true;
    }

    return false;
  };
}

export default BooleanCalculator;
