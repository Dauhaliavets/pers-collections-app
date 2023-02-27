export const replaceWithoutHashAsFirst = (str: string): string => {
  return str[0] === '#' ? str.slice(1) : str
}
