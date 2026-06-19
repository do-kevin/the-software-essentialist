class PasswordValidator {
  validate = (input: string): boolean => {
    if (!input.length) {
      return false;
    }

    const timeString1 = input.trim().replace(' ', '').split(':');
    const timeString2 = input.trim().replace(' ', '').split('-');

    console.log('timeString2: ', timeString2[0]);

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

    return true;
  };
}

export default PasswordValidator;
