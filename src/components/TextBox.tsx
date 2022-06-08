import React, { ChangeEventHandler } from 'react';

import styles from '../styles/textbox.module.css';

type TextBoxProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const TextBox = ({ text, setText }: TextBoxProps) => {
  const handleChange: ChangeEventHandler = (event) => {
    if (event.target !== null && event.target instanceof HTMLTextAreaElement) {
      setText(event.target.value);
    }
  };

  return (
    <textarea
      onChange={(event) => handleChange(event)}
      value={text}
      className={styles.textbox}
    />
  );
};

export default TextBox;
