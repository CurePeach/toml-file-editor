import React from 'react';
import toml from 'toml';

// import Table from './Table';
import styles from '../styles/viewer.module.css';
import { convertToNodes } from 'utility/types';

type ViewerProps = {
  text: string;
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
