import MilitaryTimeValidator from '../../utils/militaryTimeValidator';

describe('Password Validator', () => {
  let militaryTimeValidator: MilitaryTimeValidator;

  beforeEach(() => {
    militaryTimeValidator = new MilitaryTimeValidator();
  });

  const invalidFormatCases = [
    {
      input: '',
      why: 'if the input is empty',
    },
    {
      input: '2t:34 - ',
      why: "because it's not in a valid military time format",
    },
    {
      input: '22:34 -- ',
      why: "because it's not in a valid military time format",
    },
    {
      input: '22:3x - ',
      why: "because it's not in a valid military time format",
    },
    {
      input: ' - ',
      why: "because it's not in a valid military time format",
    },
    {
      input: '22:3x - 24:10',
      why: "because it's not in a valid military time format",
    },
  ];

  test.each(invalidFormatCases)(
    "'$input' should return false $why",
    ({ input, why }) => {
      const result = militaryTimeValidator.validate(input);
      expect(result).toBeFalsy();
    },
  );

  it('should return false because "25:30 - 24:10" is not a valid military time format', () => {
    const result = militaryTimeValidator.validate('25:30 - 24:10');

    expect(result).toBeFalsy();
  });

  it('should return false because "23:30 - 25:10" is not a valid military time format', () => {
    const result = militaryTimeValidator.validate('23:30 - 25:10');

    expect(result).toBeFalsy();
  });

  it('should return false because "23:61 - 24:00" is not a valid military time format', () => {
    const result = militaryTimeValidator.validate('23:61 - 24:00');

    expect(result).toBeFalsy();
  });

  it('should return false because "22:00 - 23:60" is not a valid military time format', () => {
    const result = militaryTimeValidator.validate('22:00 - 23:60');

    expect(result).toBeFalsy();
  });

  it('should return true because "01:12 - 14:32" is a valid military time format', () => {
    const result = militaryTimeValidator.validate('22:00 - 23:12');

    expect(result).toBeTruthy();
  });

  it('should return false because "25:00 - 12:23" is not a valid military time format', () => {
    const result = militaryTimeValidator.validate('25:00 - 12:23');

    expect(result).toBeFalsy();
  });

  it('should return true because "22:00 - 23:12" is a valid military time format', () => {
    const result = militaryTimeValidator.validate('22:00 - 23:12');

    expect(result).toBeTruthy();
  });
});
