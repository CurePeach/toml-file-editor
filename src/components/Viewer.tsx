import React from 'react';

import Dict from 'components/Dict';
import Field from 'components/Field';
import Table from 'components/Table';

import { isArray, isDict } from 'utility/types';

import styles from 'styles/viewer.module.css';

type ViewerProps = {
  dict: Record<string, unknown>;
  setDict: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  error: Error | null;
};

// eslint-disable-next-line
const Viewer = ({ dict, setDict, error }: ViewerProps) => {
  if (error != null) {
    return <div className={styles.viewer}>{error.message}</div>;
  }

  const nodes: React.ReactNode[] = [];

  for (const key of Object.keys(dict)) {
    const value = dict[key];
    if (isArray(value)) {
      nodes.push(<Table key={key} name={key} contents={value} titleRequired={true}/>);
    } else if (isDict(value)) {
      nodes.push(<Dict key={key} name={key} contents={value} />);
    } else {
      nodes.push(<Field key={key} name={key} value={String(value)} />);
    }
  }

  return <div className={styles.viewer}>{nodes}</div>;
};

export default Viewer;
