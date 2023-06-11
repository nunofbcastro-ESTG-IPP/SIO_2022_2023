import { Card, Title, BarChart, Subtitle } from '@tremor/react';

interface BarChartViewProps {
  metrics: any[];
}

const euroFormatter = (number: number) =>
  `${Intl.NumberFormat('pt').format(number).toString()} €`;

export default function BarChartView({ metrics }: BarChartViewProps) {
  const formattedMetrics = metrics.map((data) => {
    return {
      topic: data.name,
      'Costs Total': Number(data.costsTotal),
      Payed: Number(data.payed),
      Debts: Number(data.debts),
    };
  });

  return (
    <Card>
      <Title>Supplier Financial Summary</Title>
      <BarChart
        className="mt-6"
        data={formattedMetrics}
        index="topic"
        categories={['Costs Total', 'Payed', 'Debts']}
        colors={['blue', 'teal', 'amber']}
        valueFormatter={euroFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
}
