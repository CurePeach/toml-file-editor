
import Row from './Row';
import TitleRow from './TitleRow'
import { isDict } from 'utility/types';

type TableProps = {
  name: string,
  contents: unknown[]
};

const Table = ({name, contents}: TableProps) => {
  console.log(contents);

  const rows: React.ReactNode[] = [];
  let titleRequired = false;
  const keys: Set<string> = new Set();
  for (const item of contents) {
    if (isDict(item)) {
      titleRequired = true;
      for (const key of Object.keys(item)) {
        keys.add(key);
      }
      rows.push(<Row item={item}/>)
    } else {
      rows.push(
        <tr>
          <td>{String(item)}</td>
        </tr>
      );
    }
  }

  if (titleRequired) {
    rows.unshift(<TitleRow keys={Array.from(keys)} />);
  }

  return (
    <div>
      {name}
      <table>
        {rows}
      </table>
    </div>
  );
};

export default Table;