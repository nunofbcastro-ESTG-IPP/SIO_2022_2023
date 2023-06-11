
import { Card, Color, Flex, Icon, Metric, Text } from "@tremor/react";

import { CashIcon, CurrencyEuroIcon, TicketIcon, UserGroupIcon } from "@heroicons/react/solid";

// Basic formatters for the chart values
const euroFormatter = (value: number) => `${Intl.NumberFormat("pt").format(value).toString()} €`;

interface KpiCardsProps {
  metrics: any;
}

export default function KpiCards({ metrics }: KpiCardsProps) {
	const formattedMetrics: {
		title: string
		metric: string
		icon: any
		color: Color
	}[] = [
		{
			title: "Sales",
			metric: euroFormatter(Number(metrics["Sales"])),
			icon: TicketIcon,
			color: "indigo",
		},
		{
			title: "Cost of Goods",
			metric: euroFormatter(-Number(metrics["Cost of Goods"])),
			icon: CashIcon,
			color: "fuchsia",
		},
		{
			title: "Gross Income",
			metric: euroFormatter(Number(metrics["Gross Income"])),
			icon: CurrencyEuroIcon,
			color: "lime",
		},
		{
			title: "Customers",
			metric: metrics["Total customer"],
			icon: UserGroupIcon,
			color: "amber",
		},
	]

	return (
		<>
			{formattedMetrics.map((item) => (
				<Card key={item.title} decoration="top" decorationColor={item.color}>
					<Flex justifyContent="start" className="space-x-4">
						<Icon icon={item.icon} variant="light" size="xl" color={item.color} />
						<div className="truncate">
							<Text>{item.title}</Text>
							<Metric className="truncate">{item.metric}</Metric>
						</div>
					</Flex>
				</Card>
			))}
		</>
	)
}
