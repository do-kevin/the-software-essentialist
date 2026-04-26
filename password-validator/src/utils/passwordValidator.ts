class PasswordValidator {
  validate = (input?: string) => {
    return {
      data: {
        // pretend this is salted
        password: 'password123',
      },
      errors: [],
    };
  };
}

export default PasswordValidator;
