import React from 'react';

import TextBox from 'components/TextBox';

import Viewer from './components/Viewer';
import styles from './styles/app.module.css';

function App() {
  const [toml, setToml] = React.useState('test');

  return (
    <div className={styles.container}>
      <TextBox text={toml} setText={setToml} />
      <Viewer text={toml} />
    </div>
  );
}

export default App;
