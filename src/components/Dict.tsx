import { isArray, isDict } from 'utility/types';

import styles from '../styles/dict.module.css';
import Field from './Field';
import Table from './Table';
import Title from './Title';

type DictProps = {
  name: string;
  contents: Record<string, unknown>;
};

const Dict = ({ name, contents }: DictProps) => {
  const nodes: React.ReactNode[] = [<Title title={name} />];

  for (const [key, value] of Object.entries(contents)) {
    if (isArray(value)) {
      nodes.push(
        <div className={styles.child}>
          <Table name={key} contents={value} />
        </div>
      );
    } else if (isDict(value)) {
      nodes.push(
        <div className={styles.child}>
          <Dict name={key} contents={value} />
        </div>
      );
    } else {
      nodes.push(<Field name={key} value={String(value)} />);
    }
  }
  return <div>{nodes}</div>;
};

export default Dict;
