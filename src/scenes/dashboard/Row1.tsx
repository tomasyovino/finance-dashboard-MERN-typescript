import DashboardBox from "@/components/DashboardBox"
import { useGetKpisQuery } from "@/state/api"
import { useMemo } from "react"
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line
} from "recharts"

type Props = {}

const Row1 = (props: Props) => {
    const { data } = useGetKpisQuery()
    const revenueExpenses = useMemo(() => {
        return (
            data && 
            data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses
                };
            })
        )
    }, [data])

    return (
        <>
            <DashboardBox gridArea="a">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={revenueExpenses}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="b"></DashboardBox>
            <DashboardBox gridArea="c"></DashboardBox>
        </>
    )
}

export default Row1