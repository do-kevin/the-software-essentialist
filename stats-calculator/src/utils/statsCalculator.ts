type StatsCalculatorResult = {
  minVal: null | number;
  maxVal: null | number;
  numOfElements: null | number;
  averageVal: null | number;
};

class StatsCalculator {
  calculate = (input: Array<number>) => {
    const programmersModel: StatsCalculatorResult = {
      minVal: null,
      maxVal: null,
      numOfElements: null,
      averageVal: null,
    };

    programmersModel.numOfElements = input.length;

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

      if (!programmersModel.maxVal) {
        programmersModel.maxVal = input[i];
      }

      if (input[i] > programmersModel.maxVal) {
        programmersModel.maxVal = input[i];
      }

      if (input[i + 1] > programmersModel.maxVal) {
        programmersModel.maxVal = input[i + 1];
      }
    }

    return programmersModel;
  };
}

export { StatsCalculator };
