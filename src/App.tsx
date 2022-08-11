import React from 'react';
import toml from 'toml';
import tomlify from 'tomlify-j0.4';

import Button from './components/Button';
import Container from './components/Container';
import TextBox from './components/TextBox';
import Viewer from './components/Viewer';
import styles from './styles/app.module.css';
import { ActionType, DataType, emptyFunction } from './utility/types';

function App() {
  const [text, setText] = React.useState('');
  const [dict, setDict] = React.useState<Record<string, unknown>>({});
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

  const toggleEditor = () => {
    setTextMode(!textMode);
  };

  const addNode = (node: Record<string, string>) => {
    if (!textMode) {
      const sample = { ...dict, ...node };
      setDict(sample);
    } else {
      alert('Please turn on the graphical editor to use this feature');
    }
  };

  const deleteNode = (node: Record<string, string>) => {
    if (!textMode) {
      const sample = { ...dict };
      const key = node.key;
      delete sample[key];
      setDict(sample);
    } else {
      alert('Please turn on the graphical editor to use this feature');
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.status}>
        {textMode ? (
          <Button
            title={'Switch To Graphical Editor'}
            type={ActionType.Normal}
            onClick={toggleEditor}
            edit={DataType.None}
            tellParent={emptyFunction}
          />
        ) : (
          <Button
            title={'Switch To Text Editor'}
            type={ActionType.Normal}
            onClick={toggleEditor}
            edit={DataType.None}
            tellParent={emptyFunction}
          />
        )}
      </div>
      <div className={styles.toolbar}>
        <Button
          title={'Add New Field'}
          type={ActionType.Add}
          onClick={emptyFunction}
          edit={DataType.Field}
          tellParent={addNode}
        />
        <Button
          title={'Delete A Field'}
          type={ActionType.Delete}
          onClick={emptyFunction}
          edit={DataType.Field}
          tellParent={deleteNode}
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
