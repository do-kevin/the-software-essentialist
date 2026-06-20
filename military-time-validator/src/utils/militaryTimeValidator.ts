class MilitaryTimeValidator {
  validate = (input: string): boolean => {
    if (!input.length) {
      return false;
    }

    const timeString1 = input.trim().replace(' ', '').split(':');
    const timeString2 = input.trim().replace(' ', '').split('-');

    if (timeString2[0].length <= 0) {
      return false;
    }

    const isNotLoneMinus =
      !timeString1[1].includes('-') ||
      timeString1[1].split('-').length - 1 !== 1;

    if (isNotLoneMinus) {
      return false;
    }

    if (
      Number.isNaN(Number(timeString1[0])) ||
      Number.isNaN(Number(timeString1[1].split('-')[0]))
    ) {
      return false;
    }

    if (Number(timeString1[0]) > 24) {
      return false;
    }

    if (Number(timeString2[1].trim().split(':')[0]) > 24) {
      return false;
    }

    if (Number(timeString2[1].trim().split(':')[1]) >= 60) {
      return false;
    }

    if (Number(timeString1[1].split('-')[0]) >= 60) {
      return false;
    }

    return true;
  };
}

export default MilitaryTimeValidator;
