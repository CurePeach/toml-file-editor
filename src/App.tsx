import React from 'react';
import toml from 'toml';
import tomlify from 'tomlify-j0.4';

import Button from './components/Button';
import { ButtonType } from './components/Button';
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

  React.useEffect(() => {
    setText(tomlify.toToml(dict, { space: 4 }));
  }, [dict]);

  const addNode = (node: Record<string, string>) => {
    const sample = Object.assign({}, dict, node);
    setDict(sample);
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <Button
          title={'Add New Field'}
          type={ButtonType.Field}
          tellParent={addNode}
        />
      </div>
      <div className={styles.container}>
        <Container>
          <TextBox text={text} setText={setText} />
        </Container>
        <Container>
          <Viewer dict={dict} setDict={setDict} error={error} />
        </Container>
      </div>
    </div>
  );
}

export default App;
