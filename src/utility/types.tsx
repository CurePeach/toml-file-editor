export const isArray = (
  toDetermine: unknown
): toDetermine is Array<unknown> => {
  if (toDetermine instanceof Array) {
    return true;
  }
  return false;
};

export const isDict = (
  toDetermine: unknown
): toDetermine is Record<string, unknown> => {
  if (
    !(toDetermine instanceof Array) &&
    !(toDetermine instanceof Date) &&
    typeof toDetermine === 'object'
  ) {
    return true;
  }
  return false;
};
