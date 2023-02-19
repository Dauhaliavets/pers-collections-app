export const getSubstrings = (str: string): string[] => {
  return str.split(' ').filter((substr) => substr.length)
}
