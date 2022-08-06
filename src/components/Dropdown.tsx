import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import styles from '../styles/dropdown.module.css';

type DropdownProps = {
  title: string;
  list: string[];
};

type ListItem = {
  id: number;
  name: string;
  selected: boolean;
};

const Dropdown = ({ title, list }: DropdownProps) => {
  const [isOpen, setOpen] = React.useState(false);

  const handleMouseDown = () => {
    setOpen(!isOpen);
  };

  const items: ListItem[] = convertToListItems(list);

  return (
    <div className={styles.wrapper}>
      <div onMouseDown={handleMouseDown}>
        {title}{' '}
        {isOpen ? (
          <FontAwesomeIcon icon={solid('angle-up')} />
        ) : (
          <FontAwesomeIcon icon={solid('angle-down')} />
        )}
      </div>
      {isOpen && (
        <div className={styles.list}>
          {items.map((item) => (
            <div className={styles.listitem}>{item.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const convertToListItems = (list: string[]): ListItem[] => {
  const items: ListItem[] = [];
  let count = 0;
  for (const title of list) {
    items.push({
      id: count,
      name: title,
      selected: false,
    });
    count += 1;
  }

  return items;
};

export default Dropdown;
