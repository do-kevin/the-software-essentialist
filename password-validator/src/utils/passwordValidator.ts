type ErrorMessage = {
  code: string;
  message: string;
};

type PasswordErrors = ErrorMessage[];

class PasswordValidator {
  validate = (input: string) => {
    const errors: PasswordErrors = [];

    if (!(input.length >= 5 && input.length <= 15)) {
      errors.push({
        code: 'INVALID_LENGTH',
        message: 'The password must be between 5 and 15 characters long.',
      });
    }

    console.log(input, input.toLowerCase());

    if (input === input.toLowerCase()) {
      errors.push({
        code: 'NO_UPPERCASE',
        message: 'The password must have at least 1 uppercased letter.',
      });
    }

    return {
      data: {
        // pretend this is salted
        password: input,
      },
      errors,
    };
  };
}

export default PasswordValidator;
