import { DateRangePickerValue } from "@tremor/react"
import { createContext, ReactNode, useContext, useMemo, useState } from "react"

interface DashboardProviderProps {
	children: ReactNode
}

interface DashboardContextData {
	currentDateRange: DateRangePickerValue
	setCurrentDateRange: (value: DateRangePickerValue) => void
}

const DashboardContext = createContext({} as DashboardContextData)

export default function DashboardProvider({ children }: DashboardProviderProps) {
	const [currentDateRange, setCurrentDateRange] = useState<DateRangePickerValue>([
		new Date(new Date().getFullYear(), 0, 1),
		new Date(new Date().getFullYear(), 11, 31),
	])

	const dashboardContextValue = useMemo(
		() => ({
			currentDateRange,
			setCurrentDateRange
		}),
		[currentDateRange]
	)

	return <DashboardContext.Provider value={dashboardContextValue}>{children}</DashboardContext.Provider>
}

export const useDashboard = () => useContext(DashboardContext)
