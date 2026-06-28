class BooleanCalculator {
  evaluate = (input: string): boolean => {
    input = input.replace(/\s+/g, ' ').trim();

    while (input.includes('(')) {
      input = input.replace(/\(([^()]*)\)/g, (_, insideParens) => {
        console.log('insideParens: ', insideParens);
        const trimmed = insideParens.trim();
        if (!trimmed) {
          throw new Error('Syntax Error: Empty parentheses.');
        }
        return this.evaluate(trimmed) ? 'TRUE' : 'FALSE';
      });
    }

    console.log('new input: ', input);

    const operandsAndOperators = input.split(' ');
    const operands = [];
    const operators = [];

    for (let i = 0; i < operandsAndOperators.length; i++) {
      if (operandsAndOperators[i] === 'TRUE') {
        operands.push(true);
      } else if (operandsAndOperators[i] === 'FALSE') {
        operands.push(false);
      } else if (operandsAndOperators[i] === 'AND') {
        operators.push('&&');
      } else if (operandsAndOperators[i] === 'OR') {
        operators.push('||');
      } else {
        const errorMessage = `Syntax Error: Unrecognized token "${operandsAndOperators[i]}"`;
        throw new Error(errorMessage);
      }
    }

    if (operands.length === 0) {
      throw new Error('Invalid expression: No operands provided.');
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
        result = result && nextOperand;
      }

      if (currentOperator === '||') {
        result = result || nextOperand;
      }
    }

    return result;
  };
}

export default BooleanCalculator;
