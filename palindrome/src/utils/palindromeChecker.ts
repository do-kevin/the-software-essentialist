class PalindromeChecker {
  isPalindrome = (str: string): boolean => {
    const originalString = str.toLowerCase().split(' ').join('');

    const reversedString = str.toLowerCase().split('').reverse().join('');

    const result = originalString === reversedString.split(' ').join('');

    return result;
  };
}

export default PalindromeChecker;
