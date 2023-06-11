import { InformationCircleIcon } from "@heroicons/react/outline"
import { Card, Flex, Icon, LineChart, Text, Title, Toggle, ToggleItem } from "@tremor/react"
import { useState } from "react"

// Basic formatters for the chart values
const euroFormatter = (value: number) => `${Intl.NumberFormat("pt").format(value).toString()} €`

interface LineChartProps {
	cost_sales_gross_month: any[]
}

const numberFormatter = (value: number) => `${Intl.NumberFormat("us").format(value).toString()}`

const formatters: { [key: string]: any } = {
	Gross: euroFormatter,
	"New Clients": numberFormatter,
	"Active Clients": numberFormatter,
}

export default function LineChartView({ cost_sales_gross_month }: LineChartProps) {
	const [selectedKpi, setSelectedKpi] = useState("Active Clients")

	const formattedProducts = cost_sales_gross_month.map((data) => {
		return {
			date: data.MonthYear,
			Gross: Number(data.Gross),
			"New Clients": Number(data.NewClients),
			"Active Clients": Number(data.ActiveCustomer),
		}
	})

	return (
		<Card>
			<div className="md:flex justify-between">
				<div>
					<Flex justifyContent="start" className="space-x-0.5" alignItems="center">
						<Title> Company Growth Analysis </Title>
						<Icon
							icon={InformationCircleIcon}
							variant="simple"
							tooltip="Shows month (%) changes of past performance"
						/>
					</Flex>
					<Text> Month increase or decrease per domain </Text>
				</div>
				<div className="mt-6 md:mt-0">
					<Toggle
						color="zinc"
						defaultValue={selectedKpi}
						onValueChange={(value) => setSelectedKpi(value)}
					>
						<ToggleItem value="Active Clients" text="Active Clients" />
						<ToggleItem value="New Clients" text="New Clients" />
						<ToggleItem value="Gross" text="Gross" />
					</Toggle>
				</div>
			</div>
			<LineChart
				data={formattedProducts}
				index="date"
				categories={[selectedKpi]}
				colors={["blue"]}
				valueFormatter={formatters[selectedKpi]}
				yAxisWidth={56}
				className="h-96 mt-8"
			/>
		</Card>
	)
}
