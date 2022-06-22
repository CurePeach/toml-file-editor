import React from 'react';
import toml from 'toml';

// import Table from './Table';
import styles from '../styles/viewer.module.css';

type ViewerProps = {
  text: string;
};

const convertTomlToText = (parsed: Record<string, unknown>): React.ReactNode[] => {
  // TODO: make this thing do something
  const nodes: React.ReactNode[] = [];
  
  for (const item of Object.keys(parsed)) {
    console.log(typeof parsed[item]);
    console.log(parsed[item] instanceof Object);
    if (parsed[item] instanceof Array) {
      // nodes.push(<Table name={item} contents={parsed[item]}/>);
      nodes.push("array\n"); 
    } else if (typeof parsed[item] === "object") {
      console.log("why");
      nodes.push("dictionary\n");
    } else {
      nodes.push("raw\n");
    }
  }

  console.log(parsed);
  
  return nodes;
};

const Viewer = ({ text }: ViewerProps) => {
  try {
    const parsed = toml.parse(text);
    const tomlNodes = convertTomlToText(parsed);
    return <div className={styles.viewer}>{tomlNodes}</div>;
  } catch (e) {
    if (e instanceof Error) {
      return <div className={styles.viewer}>{e.message}</div>;
    } else {
      return <div className={styles.viewer}>{text}</div>;
    }
  }
};

export default Viewer;
