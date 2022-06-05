import React from 'react';

import Viewer from './components/Viewer';
import styles from './styles/app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Viewer text="left" />
      <Viewer text="right" />
    </div>
  );
}

export default App;
