import React from 'react';
import toml from 'toml';
import tomlify from 'tomlify-j0.4';

import Button from './components/Button';
import Container from './components/Container';
import TextBox from './components/TextBox';
import Viewer from './components/Viewer';
import styles from './styles/app.module.css';
import { ActionType, DataType } from './utility/types';

function App() {
  const [text, setText] = React.useState('');
  const [dict, setDict] = React.useState({});
  const [error, setError] = React.useState<Error | null>(null);
  const [textMode, setTextMode] = React.useState(false);

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
    if (!textMode) {
      setText(tomlify.toToml(dict, { space: 4 }));
    }
  }, [dict, textMode]);

  const addNode = (node: Record<string, string>) => {
    if (!textMode) {
      const sample = Object.assign({}, dict, node);
      setDict(sample);
    } else {
      alert('Please turn on the graphical editor to use this feature');
    }
  };

  const toggleEditor = () => {
    console.log(textMode);
    setTextMode(!textMode);
  };

  return (
    <div>
      <div className={styles.toolbar}>
        {textMode ? (
          <Button
            title={'Switch To Graphical Editor'}
            type={ActionType.Normal}
            onClick={toggleEditor}
            edit={DataType.None}
            tellParent={() => {
              return;
            }}
          />
        ) : (
          <Button
            title={'Switch To Text Editor'}
            type={ActionType.Normal}
            onClick={toggleEditor}
            edit={DataType.None}
            tellParent={() => {
              return;
            }}
          />
        )}
        <Button
          title={'Add New Field'}
          type={ActionType.Add}
          onClick={() => {
            return;
          }}
          edit={DataType.Field}
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
