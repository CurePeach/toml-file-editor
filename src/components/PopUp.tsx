import React from 'react';

import { ActionType, DataType } from 'utility/types';

import styles from 'styles/button.module.css';

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
  } else if (type == ActionType.Delete && edit == DataType.Field) {
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
  } else if (type == ActionType.Add && edit == DataType.Array) {
    formContents.push(
      <input
        key="key"
        name="key"
        placeholder="array name"
        value={keyValue}
        required
        onChange={handleKeyChange}
      />
    );
    formContents.push(<div className={styles.break} />);
    formContents.push(
      <textarea
        key="value"
        name="value"
        placeholder="array contents (separate by line)"
        value={value}
        required
        onChange={
          handleValueChange as
            | React.ChangeEventHandler<HTMLTextAreaElement>
            | undefined
        }
        className={styles.textarea}
      />
    );
  }

  return (
    <div className={styles.popup}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {formContents}
        {edit == DataType.Array ? (
          <div>
            <div className={styles.break} />
            <input type="submit" />
          </div>
        ) : (
          <input type="submit" className={styles.submit} />
        )}
      </form>
    </div>
  );
};

export default PopUp;
