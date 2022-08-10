import React from 'react';

import styles from '../styles/button.module.css';

export enum ButtonType {
  Field,
  Array,
  Dict,
  Normal,
}

type ButtonProps = {
  title: string;
  type: ButtonType;
  tellParent: (node: Record<string, string>) => void;
};

const Button = ({ title, type, tellParent }: ButtonProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const [key, setKey] = React.useState('');
  const [value, setValue] = React.useState('');
  const [newNode, setNewNode] = React.useState({});

  React.useEffect(() => {
    tellParent(newNode);
  }, [newNode]);

  let popup: React.ReactNode;
  if (type == ButtonType.Field) {
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
  } else if (type == ButtonType.Array) {
    popup = <div className={styles.popup}>Is an array</div>;
  } else if (type == ButtonType.Dict) {
    popup = <div className={styles.popup}>Is a dict</div>;
  }

  const handleMouseDown = () => {
    if (type == ButtonType.Normal) {
      tellParent({});
    } else {
      setOpen(!isOpen);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.button} onMouseDown={handleMouseDown}>
        {title}
      </div>
      {type != ButtonType.Normal && isOpen && popup}
    </div>
  );
};

export default Button;
