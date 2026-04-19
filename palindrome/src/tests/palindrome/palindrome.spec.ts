import PalindromeChecker from '../../utils/palindromeChecker';

describe('Palindrome checker', () => {
  it("should be able to tell that 'mom' is a palindrome", () => {
    const palindromeChecker = new PalindromeChecker();

    expect(palindromeChecker.isPalindrome('mom')).toBeTruthy();
  });

  it("should be able to tell that 'bill' is a not palindrome", () => {
    const palindromeChecker = new PalindromeChecker();

    expect(palindromeChecker.isPalindrome('bill')).toBeFalsy();
  });
});
