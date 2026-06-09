class PasswordValidator {
  validate = (input: string): boolean => {
    if (!input.length) {
      return false;
    }

    const timeString = input.trim().replace(' ', '').split(':');

    const isNotLoneMinus =
      !timeString[1].includes('-') || timeString[1].split('-').length - 1 !== 1;

    if (isNotLoneMinus) {
      return false;
    }

    if (
      Number.isNaN(Number(timeString[0])) ||
      Number.isNaN(Number(timeString[1].split('-')[0]))
    ) {
      return false;
    }

    return true;
  };
}

export default PasswordValidator;
