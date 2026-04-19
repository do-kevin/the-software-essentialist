class PalindromeChecker {
  isPalindrome = (str: string): boolean => {
    const originalString = str.toLowerCase();
    const reversedString = str.toLowerCase().split('').reverse().join('');

    const result = originalString === reversedString;

    return result;
  };
}

export default PalindromeChecker;
