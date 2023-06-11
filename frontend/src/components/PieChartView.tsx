import { Badge, Card, DonutChart, Flex, Text, Title } from '@tremor/react';

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('pt').format(number).toString()} €`;

interface PieChartProps {
  products: any[];
}

export default function PieChartView({ products }: PieChartProps) {
  const formattedProducts = products.map((product) => {
    return {
      product: product.productGroup,
      gross: Number(product.profit),
    };
  });

  return (
    <Card>
      <Flex justifyContent="start" className="space-x-2">
        <Title>Most Sold Products</Title>
        <Badge color="gray">{formattedProducts.length}</Badge>
      </Flex>
      <Text>Top products by value</Text>
      <DonutChart
        className="mt-6"
        data={formattedProducts}
        category="gross"
        index="product"
        valueFormatter={valueFormatter}
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
    </Card>
  );
}
