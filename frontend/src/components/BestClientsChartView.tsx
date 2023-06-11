import { Badge, Card, DonutChart, Flex, Text, Title } from '@tremor/react';

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('pt').format(number).toString()} €`;

interface BestClientsChartViewProps {
  clients: any[];
}

export default function BestClientsChartView({
  clients,
}: BestClientsChartViewProps) {
  const formattedClients = clients.map((clients) => {
    return {
      name: clients.companyName,
      amountSpent: Number(clients.amountSpent),
    };
  });

  return (
    <Card>
      <Flex justifyContent="start" className="space-x-2">
        <Title>Top clients</Title>
        <Badge color="gray">{formattedClients.length}</Badge>
      </Flex>
      <Text>Highest-spending clients in-store</Text>
      <DonutChart
        className="mt-6"
        data={formattedClients}
        category="amountSpent"
        index="name"
        valueFormatter={valueFormatter}
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
    </Card>
  );
}
