export const escapeChars = (str) => {
  // prettier-ignore
  const chars = ["_", "*", ",", "[", "]", "(", ")",  '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!' ];
  return str
    .split("")
    .map((char, i) => {
      if (chars.includes(char)) {
        return `\\${char}`;
      }
      return char;
    })
    .join("");
};
