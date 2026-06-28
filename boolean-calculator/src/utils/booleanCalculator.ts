class BooleanCalculator {
  evaluate = (input: string): boolean => {
    input = input.replace(/\s+/g, ' ').trim();

    const operandsAndOperators = input.split(' ');

    const operands = [];
    const operators = [];

    for (let i = 0; i < operandsAndOperators.length; i++) {
      if (operandsAndOperators[i] === 'TRUE') {
        operands.push(true);
      }
      if (operandsAndOperators[i] === 'FALSE') {
        operands.push(false);
      }
      if (operandsAndOperators[i] === 'AND') {
        operators.push('&&');
      }

      if (operandsAndOperators[i] === 'OR') {
        operators.push('||');
      }
    }

    if (operands.length <= 1) {
      return operands[0];
    }

    let currentOperator = operators[0];
    let nextOperand = undefined;
    let result = operands[0];

    for (let j = 0; j < operators.length; j++) {
      currentOperator = operators[j];
      nextOperand = operands[j + 1];

      if (nextOperand === undefined) {
        throw new Error('Missing operand after operator');
      }

      if (currentOperator === '&&') {
        console.log(result, nextOperand);
        result = result && nextOperand;
      }

      if (currentOperator === '||') {
        console.log(result, nextOperand);
        result = result || nextOperand;
      }
    }

    return result;
  };
}

export default BooleanCalculator;
