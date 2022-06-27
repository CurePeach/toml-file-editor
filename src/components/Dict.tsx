
import { isArray, isDict } from "utility/types";

type DictProps = {
  name: string,
  // contents: Record<string, unknown>
  contents: unknown
};

const Dict = ({name, contents}: DictProps) => {
  const nodes: React.ReactNode[] = [<div>{name}</div>];

  if (isDict(contents)) {
    for (const key of Object.keys(contents)) {
      if (isArray(contents[key])) {
        nodes.push("array\n");
      } else if (contents[key] instanceof Date) {
        nodes.push("date\n");
      } else if (isDict(contents[key])) {
        nodes.push("dictionary\n");
        nodes.push(<Dict name={key} contents={contents[key]} />)
      } else {
        nodes.push(`${key} = ${contents[key]}\n`);
      }
    }
  }
  return (<div>{nodes}</div>);
};

export default Dict;