class PalindromeChecker {
  isPalindrome = (str: string): boolean => {
    const originalString = str;
    const reversedString = str.split('').reverse().join('');

    const result = originalString === reversedString;

    return result;
  };
}

export default PalindromeChecker;
