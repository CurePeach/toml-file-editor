import React from 'react';

import styles from './styles/app.module.css';

import Viewer from './components/Viewer';

function App() {
  return (
    <div className={styles.container}>
      <Viewer text="left" />
      <Viewer text="right" />
    </div>
  );
}

export default App;
