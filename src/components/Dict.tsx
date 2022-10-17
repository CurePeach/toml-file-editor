import Field from 'components/Field';
import Table from 'components/Table';
import Title from 'components/Title';

import { isArray, isDict } from 'utility/types';

import styles from 'styles/dict.module.css';

type DictProps = {
  name: string;
  contents: Record<string, unknown>;
};

const Dict = ({ name, contents }: DictProps) => {
  const nodes: React.ReactNode[] = [<Title key={name} title={name} />];

  for (const [key, value] of Object.entries(contents)) {
    if (isArray(value)) {
      nodes.push(
        <div key={key} className={styles.child}>
          <Table name={key} contents={value} />
        </div>
      );
    } else if (isDict(value)) {
      nodes.push(
        <div key={key} className={styles.child}>
          <Dict name={key} contents={value} />
        </div>
      );
    } else {
      nodes.push(<Field key={key} name={key} value={String(value)} />);
    }
  }
  return <div>{nodes}</div>;
};

export default Dict;
