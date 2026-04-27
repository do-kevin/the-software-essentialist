type ErrorMessage = {
  code: string;
  message: string;
};

type PasswordErrors = ErrorMessage[];

class PasswordValidator {
  validate = (input: string) => {
    const errors: PasswordErrors = [];

    const programmersModel = {
      isNotWithinRange: !(input.length >= 5 && input.length <= 15),
      hasNoUppercaseLetter: input === input.toLowerCase(),
      hasDigit: /[0-9]/.test(input),
      isValid: true,
    };

    if (programmersModel.isNotWithinRange) {
      errors.push({
        code: 'INVALID_LENGTH',
        message: 'The password must be between 5 and 15 characters long.',
      });
    }

    if (programmersModel.hasNoUppercaseLetter) {
      errors.push({
        code: 'NO_UPPERCASE',
        message: 'The password must have at least 1 uppercased letter.',
      });
    }

    if (!programmersModel.hasDigit) {
      errors.push({
        code: 'MISSING_DIGIT',
        message: 'The password must have at least 1 digit.',
      });
    }

    programmersModel.isValid = errors.length ? false : true;

    return {
      isValid: programmersModel.isValid,
      data: {
        // pretend this is salted
        password: input,
      },
      errors,
    };
  };
}

export default PasswordValidator;
