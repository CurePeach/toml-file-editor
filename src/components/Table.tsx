import { isDict } from 'utility/types';

import styles from '../styles/table.module.css';
import Row from './Row';
import Title from './Title';
import TitleRow from './TitleRow';

type TableProps = {
  name: string;
  contents: unknown[];
};

const Table = ({ name, contents }: TableProps) => {
  const rows: React.ReactNode[] = [];
  let titleRequired = false;
  const keys: Set<string> = new Set();
  for (const item of contents) {
    if (isDict(item)) {
      titleRequired = true;
      for (const key of Object.keys(item)) {
        keys.add(key);
      }
      rows.push(<Row item={item} />);
    } else {
      rows.push(
        <tr>
          <td className={styles.row}>{String(item)}</td>
        </tr>
      );
    }
  }

  if (titleRequired) {
    rows.unshift(<TitleRow keys={Array.from(keys)} />);
  }

  return (
    <div>
      <Title title={name} />
      <table className={styles.table}>{rows}</table>
    </div>
  );
};

export default Table;
