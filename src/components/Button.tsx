import styles from '../styles/button.module.css';

type ButtonProps = {
  title: string;
};

const Button = ({ title }: ButtonProps) => {
  return <div className={styles.button}>{title}</div>;
};

export default Button;
