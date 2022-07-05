type TitleRowProps = {
  keys: string[]
}

const TitleRow = ({keys}: TitleRowProps) => {
  console.log(keys);
  const headings: React.ReactNode[] = [];
  for (const key of keys) {
    headings.push(<th>{key}</th>);
  }

  return (
    <tr>{headings}</tr>
  );
}

export default TitleRow;