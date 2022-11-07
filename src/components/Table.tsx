import Title from 'components/Title';
import TitleRow from 'components/TitleRow';

import { isArray, isDict } from 'utility/types';

import styles from 'styles/table.module.css';

type RowProps = {
  item: Record<string, unknown>;
  keys: string[];
};

const Row = ({ item, keys }: RowProps) => {
  const values: React.ReactNode[] = [];
  for (const key of keys) {
    if (key in item) {
      const contents = item[key]
      if (isArray(contents)) {
        values.push(
          <td key={key} className={styles.row}>
            <Table name={key} contents={contents} titleRequired={false}/>
          </td>
        );
      } else {
        values.push(
          <td key={key} className={styles.row}>
            {String(contents)}
          </td>
        );
      }
    } else {
      values.push(
        <td key={key} className={styles.row} />
      );
    }
    
  }
  return <tr>{values}</tr>;
};

type TableProps = {
  name: string;
  contents: unknown[];
  titleRequired: boolean;
};

const Table = ({ name, contents, titleRequired }: TableProps) => {
  const rows: React.ReactNode[] = [];
  let count = 0;
  let titleRowRequired = false;
  const keys: Set<string> = new Set();
  for (const item of contents) {
    if (isDict(item)) {
      titleRowRequired = true;
      for (const key of Object.keys(item)) {
        keys.add(key);
      }
    } else if (isArray(item)) {
      const thisRow: React.ReactNode[] = [];
      for (const col of item) {
        thisRow.push(
          <td key={String(col)} className={styles.row}>
            {String(col)}
          </td>
        );
      }
      rows.push(<tr key={count}>{thisRow}</tr>);
    } else {
      rows.push(
        <tr key={count}>
          <td className={styles.row}>{String(item)}</td>
        </tr>
      );
    }
    count += 1;
  }

  if (titleRowRequired) {
    rows.unshift(<TitleRow key={'title'} keys={Array.from(keys)} />);
    
    count = 0;
    for (const item of contents) {
      if (isDict(item)) {
        rows.push(<Row key={count} item={item} keys={Array.from(keys)} />);
      }

      count += 1;
    }

  }

  return (
    <div>
      {titleRequired && <Title title={name} />}
      <table className={styles.table}>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;
