import React from 'react';

import styles from '../styles/button.module.css';
import { ActionType, DataType } from '../utility/types';

type ButtonProps = {
  title: string;
  type: ActionType;
  onClick: () => void;
  edit: DataType;
  tellParent: (node: Record<string, string>) => void;
};

const Button = ({ title, type, onClick, edit, tellParent }: ButtonProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const [key, setKey] = React.useState('');
  const [value, setValue] = React.useState('');
  const [newNode, setNewNode] = React.useState({});

  if (type != ActionType.Normal) {
    React.useEffect(() => {
      tellParent(newNode);
    }, [newNode]);
  }

  let popup: React.ReactNode;
  if (edit == DataType.Field) {
    const handleSubmit = (event: { preventDefault: () => void }) => {
      event.preventDefault();

      const newPair: Record<string, string> = {};
      newPair[key] = value;
      setNewNode(newPair);

      setOpen(false);
      setKey('');
      setValue('');
    };

    popup = (
      <div className={styles.popup}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="key"
            placeholder="key"
            value={key}
            required
            onChange={(event) => setKey(event.target.value)}
          />
          {' = '}
          <input
            name="value"
            placeholder="value"
            value={value}
            required
            onChange={(event) => setValue(event.target.value)}
          />
          <input type="submit" className={styles.submit} />
        </form>
      </div>
    );
  } else if (edit == DataType.Array) {
    popup = <div className={styles.popup}>Is an array</div>;
  } else if (edit == DataType.Dict) {
    popup = <div className={styles.popup}>Is a dict</div>;
  }

  const handleMouseDown = () => {
    if (type == ActionType.Normal) {
      onClick();
    } else {
      setOpen(!isOpen);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.button} onMouseDown={handleMouseDown}>
        {title}
      </div>
      {type != ActionType.Normal && isOpen && popup}
    </div>
  );
};

export default Button;
