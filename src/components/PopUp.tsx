import React from 'react';

import styles from '../styles/button.module.css';
import { ActionType, DataType } from '../utility/types';

type PopUpProps = {
  type: ActionType;
  edit: DataType;
  handleSubmit: React.FormEventHandler;
  keyValue: string;
  handleKeyChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  handleValueChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const PopUp = ({
  type,
  edit,
  handleSubmit,
  keyValue,
  handleKeyChange,
  value,
  handleValueChange,
}: PopUpProps) => {
  const formContents: React.ReactNode[] = [];

  if (type == ActionType.Add && edit == DataType.Field) {
    formContents.push(
      <input
        key="key"
        name="key"
        placeholder="key"
        value={keyValue}
        required
        onChange={handleKeyChange}
      />
    );
    formContents.push(' = ');
    formContents.push(
      <input
        name="value"
        placeholder="value"
        value={value}
        required
        onChange={handleValueChange}
      />
    );
  }

  if (type == ActionType.Delete && edit == DataType.Field) {
    formContents.push(
      <input
        key="key"
        name="key"
        placeholder="key"
        value={keyValue}
        required
        onChange={handleKeyChange}
      />
    );
  }

  return (
    <div className={styles.popup}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {formContents}
        <input type="submit" className={styles.submit} />
      </form>
    </div>
  );
};

export default PopUp;
