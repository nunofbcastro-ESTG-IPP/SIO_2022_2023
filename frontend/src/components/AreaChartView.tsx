import { AreaChart, Card, Text, Title } from "@tremor/react"

const euroFormatter = (number: number) => `${Intl.NumberFormat("pt").format(number).toString()} €`

interface AreaChartViewProps {
    costsAndSales: any[]
}

export default function AreaChartView({costsAndSales}: AreaChartViewProps) {
    
    const formattedCostsAndSales = costsAndSales.map(costSale => {
        return {
            month: costSale.MonthYear,
            Costs: Number(costSale.Costs),
            Sales: Number(costSale.Sales)
        }
    })

    return (
        <Card>
            <Title>Expense and Revenue Analysis.</Title>
            <Text>Comparison between Sales and Costs</Text>
            <AreaChart
                className="h-96 mt-8"
                data={formattedCostsAndSales}
                categories={["Sales", "Costs"]}
                index="month"
                colors={["indigo", "fuchsia"]}
                valueFormatter={euroFormatter}
                yAxisWidth={56}
            />
        </Card>
    )
}
