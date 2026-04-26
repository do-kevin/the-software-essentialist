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
