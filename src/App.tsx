import React from 'react';
import toml from 'toml';

import Container from './components/Container';
import TextBox from './components/TextBox';
import Viewer from './components/Viewer';
import styles from './styles/app.module.css';

function App() {
  const [text, setText] = React.useState('');
  const [dict, setDict] = React.useState({});
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    try {
      setDict(toml.parse(text));
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
  }, [text]);

  return (
    <div className={styles.container}>
      <Container>
        <TextBox text={text} setText={setText} />
      </Container>
      <Container>
        <Viewer dict={dict} setDict={setDict} error={error}/>
      </Container>
    </div>
  );
}

export default App;
