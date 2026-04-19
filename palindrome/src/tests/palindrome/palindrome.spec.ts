import PalindromeChecker from '../../utils/palindromeChecker';

describe('Palindrome checker', () => {
  let palindromeChecker: PalindromeChecker;

  beforeEach(() => {
    palindromeChecker = new PalindromeChecker();
  });

  it("should be able to tell that 'mom' is a palindrome", () => {
    expect(palindromeChecker.isPalindrome('mom')).toBeTruthy();
  });

  it("should be able to tell that 'bill' is a not palindrome", () => {
    expect(palindromeChecker.isPalindrome('bill')).toBeFalsy();
  });

  it('should be able to confirm it is a palindrom even when casing is different', () => {
    expect(palindromeChecker.isPalindrome('Mom')).toBeTruthy();
  });

  it('should be able to tell "Was It A Rat I Saw" is palindrome', () => {
    expect(palindromeChecker.isPalindrome('Was It A Rat I Saw')).toBeTruthy();
  });

  it('should be able to tell "Never Odd or Even" is palindrome', () => {
    expect(palindromeChecker.isPalindrome('Never Odd or Even')).toBeTruthy();
  });
});
