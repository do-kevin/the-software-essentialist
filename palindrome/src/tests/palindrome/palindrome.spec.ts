import PalindromeChecker from '../../utils/palindromeChecker';

describe('Palindrome checker', () => {
  const palindromeChecker = new PalindromeChecker();

  it("should be able to tell that 'mom' is a palindrome", () => {
    expect(palindromeChecker.isPalindrome('mom')).toBeTruthy();
  });

  it("should be able to tell that 'bill' is a not palindrome", () => {
    expect(palindromeChecker.isPalindrome('bill')).toBeFalsy();
  });
});
