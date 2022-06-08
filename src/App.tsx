import React from 'react';

import Container from './components/Container';
import TextBox from './components/TextBox';
import Viewer from './components/Viewer';
import styles from './styles/app.module.css';

function App() {
  const [toml, setToml] = React.useState('test');

  return (
    <div className={styles.container}>
      <Container>
        <TextBox text={toml} setText={setToml} />
      </Container>
      <Container>
        <Viewer text={toml} />
      </Container>
    </div>
  );
}

export default App;
