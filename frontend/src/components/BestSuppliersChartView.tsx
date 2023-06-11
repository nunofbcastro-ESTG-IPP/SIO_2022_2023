import { Badge, Card, DonutChart, Flex, Text, Title } from '@tremor/react';

interface BestSuppliersChartViewProps {
  suppliers: any[];
}

export default function BestSuppliersChartView({
  suppliers,
}: BestSuppliersChartViewProps) {
  const formattedSuppliers = suppliers.map((suppliers) => {
    return {
      name: suppliers.name,
      quant: Number(suppliers.quant),
    };
  });

  return (
    <Card>
      <Flex justifyContent="start" className="space-x-2">
        <Title>Top suppliers</Title>
        <Badge color="gray">{formattedSuppliers.length}</Badge>
      </Flex>
      <Text>Top supplier by quantity of items purchased</Text>
      <DonutChart
        className="mt-6"
        data={formattedSuppliers}
        category="quant"
        index="name"
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
    </Card>
  );
}
