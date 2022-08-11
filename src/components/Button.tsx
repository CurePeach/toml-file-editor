import React from 'react';

import styles from '../styles/button.module.css';
import { ActionType, DataType } from '../utility/types';
import PopUp from './PopUp';

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

  React.useEffect(() => {
    if (type != ActionType.Normal) {
      tellParent(newNode);
    }
  }, [newNode]);

  const handleKeyChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setKey(event.target.value);

  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setValue(event.target.value);

  let popup: React.ReactNode;
  if (type == ActionType.Add && edit == DataType.Field) {
    const handleSubmit: React.FormEventHandler = (event) => {
      event.preventDefault();

      const newPair: Record<string, string> = {};
      newPair[key] = value;
      setNewNode(newPair);

      setOpen(false);
      setKey('');
      setValue('');
    };

    popup = (
      <PopUp
        type={type}
        edit={edit}
        handleSubmit={handleSubmit}
        keyValue={key}
        handleKeyChange={handleKeyChange}
        value={value}
        handleValueChange={handleValueChange}
      />
    );
  } else if (type == ActionType.Delete && edit == DataType.Field) {
    const handleSubmit = (event: { preventDefault: () => void }) => {
      event.preventDefault();

      const newPair: Record<string, string> = { key: key };
      setNewNode(newPair);

      setOpen(false);
      setKey('');
    };

    popup = (
      <PopUp
        type={type}
        edit={edit}
        handleSubmit={handleSubmit}
        keyValue={key}
        handleKeyChange={handleKeyChange}
      />
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
