import React from 'react';

import styles from '../styles/container.module.css';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div className={styles.container}>{children}</div>
);

export default Container;
