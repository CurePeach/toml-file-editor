
type RowProps = {
  item: Record<string, unknown>
}

const Row = ({item}: RowProps) => {
  console.log(item);
  const values: React.ReactNode[] = [];
  for (const key of Object.keys(item)) {
    values.push(<td>{String(item[key])}</td>)
  }
  return (<tr>{values}</tr>);
}

export default Row;