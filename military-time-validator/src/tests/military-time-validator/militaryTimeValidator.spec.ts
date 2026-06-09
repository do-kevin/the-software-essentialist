import MilitaryTimeValidator from '../../utils/militaryTimeValidator';

describe('Password Validator', () => {
  let militaryTimeValidator: MilitaryTimeValidator;

  beforeEach(() => {
    militaryTimeValidator = new MilitaryTimeValidator();
  });

  it('"25:00 - 12:23" should should be an invalid military time', () => {
    const result = militaryTimeValidator.validate('"25:00 - 12:23"');

    expect(result).toBeFalsy();
  });
});
