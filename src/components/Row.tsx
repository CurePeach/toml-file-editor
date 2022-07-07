import styles from '../styles/table.module.css';

type RowProps = {
  item: Record<string, unknown>;
};

const Row = ({ item }: RowProps) => {
  const values: React.ReactNode[] = [];
  for (const key of Object.keys(item)) {
    values.push(<td className={styles.row}>{String(item[key])}</td>);
  }
  return <tr>{values}</tr>;
};

export default Row;
