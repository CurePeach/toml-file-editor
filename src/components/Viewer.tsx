import React from 'react';
import toml from 'toml';
import { isArray, isDict } from 'utility/types';

import styles from '../styles/viewer.module.css';
import Dict from './Dict';
import Table from './Table';

type ViewerProps = {
  text: string;
};

const convertToNodes = (parsed: Record<string, unknown>): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];

  for (const key of Object.keys(parsed)) {
    const value = parsed[key];

    if (isArray(value)) {
      nodes.push(<Table name={key} contents={value} />);
    } else if (isDict(value)) {
      nodes.push(<Dict name={key} contents={value} />);
    } else {
      nodes.push('raw\n');
    }
  }

  return nodes;
};

const Viewer = ({ text }: ViewerProps) => {
  try {
    const parsed = toml.parse(text);
    const tomlNodes = convertToNodes(parsed);
    return <div className={styles.viewer}>{tomlNodes}</div>;
  } catch (e) {
    if (e instanceof Error) {
      return <div className={styles.viewer}>{e.message}</div>;
    } else {
      return <div className={styles.viewer}>{text}</div>;
    }
  }
};

export default Viewer;
