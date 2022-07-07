type FieldProps = {
  name: string;
  value: string;
};

const Field = ({ name, value }: FieldProps) => {
  return (
    <p>
      {name} = {value}
    </p>
  );
};

export default Field;
