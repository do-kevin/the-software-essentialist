class PasswordValidator {
  validate = () => {
    return {
      data: {
        // pretend this is salted
        password: 'password123',
      },
    };
  };
}

export default PasswordValidator;
