import styles from 'styles/table.module.css';

type TitleRowProps = {
  keys: string[];
};

const TitleRow = ({ keys }: TitleRowProps) => {
  const headings: React.ReactNode[] = [];
  for (const key of keys) {
    headings.push(
      <th key={key} className={styles.titlerow}>
        {key}
      </th>
    );
  }

  return <tr>{headings}</tr>;
};

export default TitleRow;
