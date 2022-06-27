

export const isArray = (toDetermine: unknown): toDetermine is Array<unknown> => {
  if (toDetermine instanceof Array) {
    return true;
  }
  return false;
}

export const isDict = (toDetermine: unknown): toDetermine is Record<string, unknown> => {
  if (!(toDetermine instanceof Array) && !(toDetermine instanceof Date) 
      && typeof toDetermine === "object") {
    return true;
  }
  return false;
}

export const convertToNodes = (parsed: Record<string, unknown>): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];

  for (const key of Object.keys(parsed)) {
    if (isArray(parsed[key])) {
      nodes.push("array\n");
    } else if (parsed[key] instanceof Date) {
      nodes.push("date\n");
    } else if (isDict(parsed[key])) {
      nodes.push("dictionary\n");
    } else {
      nodes.push("raw\n");
    }
  }

  return nodes;
}