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
});
