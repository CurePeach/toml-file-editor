import React from 'react';

import styles from '../styles/viewer.module.css';

type ViewerProps = {
  text: string;
};

const Viewer = ({ text }: ViewerProps) => (
  <div className={styles.viewer}>{text}</div>
);

export default Viewer;
