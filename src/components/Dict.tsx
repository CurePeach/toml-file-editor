
import { isArray, isDict } from "utility/types";

type DictProps = {
  name: string,
  contents: Record<string, unknown>
};

const Dict = ({name, contents}: DictProps) => {
  const nodes: React.ReactNode[] = [<div>{name}</div>];

  for (const key of Object.keys(contents)) {
    const value = contents[key];

    if (isArray(value)) {
      nodes.push("array\n");
    } else if (value instanceof Date) {
      nodes.push("date\n");
    } else if (isDict(value)) {
      nodes.push("dictionary\n");
      nodes.push(<Dict name={key} contents={value} />)
    } else {
      nodes.push(`${key} = ${value}\n`);
    }
  }
  return (<div>{nodes}</div>);
};

export default Dict;