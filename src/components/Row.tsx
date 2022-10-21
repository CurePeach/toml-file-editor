import styles from 'styles/table.module.css';

type RowProps = {
  item: Record<string, unknown>;
  keys: string[];
};

const Row = ({ item, keys }: RowProps) => {
  const values: React.ReactNode[] = [];
  for (const key of keys) {
    if (key in item) {
      values.push(
        <td key={key} className={styles.row}>
          {String(item[key])}
        </td>
      );
    } else {
      values.push(
        <td key={key} className={styles.row} />
      );
    }
    
  }
  return <tr>{values}</tr>;
};

export default Row;
