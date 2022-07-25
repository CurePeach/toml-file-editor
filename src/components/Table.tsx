import { isDict, isArray } from 'utility/types';

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
  let titleRowRequired = false;
  const keys: Set<string> = new Set();
  for (const item of contents) {
    if (isDict(item)) {
      titleRowRequired = true;
      for (const key of Object.keys(item)) {
        keys.add(key);
      }
      rows.push(<Row item={item} />);
    } else if (isArray(item)) {
      const thisRow: React.ReactNode[] = [];
      for (const col of item) {
        thisRow.push(
          <td className={styles.row}>{String(col)}</td>
        );
      }
      rows.push(<tr>{thisRow}</tr>);
    } else {
      rows.push(
        <tr>
          <td className={styles.row}>{String(item)}</td>
        </tr>
      );
    }
  }

  if (titleRowRequired) {
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
