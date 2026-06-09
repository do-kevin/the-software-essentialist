class PasswordValidator {
  validate = (input: string) => {
    if (!input.length) {
      return false;
    }
    return true;
  };
}

export default PasswordValidator;
