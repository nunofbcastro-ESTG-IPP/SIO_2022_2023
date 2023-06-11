import {
  Badge,
  Card,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from '@tremor/react';

const euroFormatter = (value: number) =>
  `${Intl.NumberFormat('pt').format(value).toString()} €`;

interface TableProps {
  tableData: any[];
}

export default function TableView({ tableData }: TableProps) {
  const formattedTableData = tableData.map((data) => {
    return {
      Id: data.id,
      Customer: data.CustomerName,
      Quantity: data.invoiceLines?.length,
      IVA: euroFormatter(Number(data.taxPayable)),
      NetTotal: euroFormatter(Number(data.netTotal)),
      Total: euroFormatter(Number(data.grossTotal)),
    };
  });

  return (
    <Card>
      <Flex justifyContent="start" className="space-x-2">
        <Title>Last Purchases</Title>
        <Badge color="gray">{formattedTableData.length}</Badge>
      </Flex>
      <Text className="mt-2">Overview of last purchases.</Text>

      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Transaction ID</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Quantity of Items</TableHeaderCell>
            <TableHeaderCell>Net Total</TableHeaderCell>
            <TableHeaderCell>IVA</TableHeaderCell>
            <TableHeaderCell className="text-right">Total</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {formattedTableData.map((item) => (
            <TableRow key={item.Id}>
              <TableCell>{item.Id}</TableCell>
              <TableCell>{item.Customer}</TableCell>
              <TableCell>{item.Quantity}</TableCell>
              <TableCell>{item.NetTotal}</TableCell>
              <TableCell>{item.IVA}</TableCell>
              <TableCell className="text-right">{item.Total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
