type StatsCalculatorResult = {
  minVal: null | number;
  maxVal: null | number;
};

class StatsCalculator {
  calculate = (input: Array<number>) => {
    const programmersModel: StatsCalculatorResult = {
      minVal: null,
      maxVal: null,
    };

    for (let i = 0; i < input.length - 1; i++) {
      if (!programmersModel.minVal) {
        programmersModel.minVal = input[i];
      }

      if (input[i] < programmersModel.minVal) {
        programmersModel.minVal = input[i];
      }

      if (input[i + 1] < programmersModel.minVal) {
        programmersModel.minVal = input[i + 1];
      }
    }

    return programmersModel;
  };
}

export { StatsCalculator };
