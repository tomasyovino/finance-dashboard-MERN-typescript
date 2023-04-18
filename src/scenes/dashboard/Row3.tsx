import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api'
import { DataGrid } from '@mui/x-data-grid'
import { GridCellParams } from '@mui/x-data-grid/models'
import { useTheme, Box, Typography } from "@mui/material"
import FlexBetween from '@/components/FlexBetween'
import { PieChart, Pie, Cell, } from 'recharts'
import { useMemo } from "react"

type Props = {}

const Row3 = (props: Props) => {
    const { data: kpiData } = useGetKpisQuery()
    const { data: productData } = useGetProductsQuery()
    const { data: transactionData } = useGetTransactionsQuery()
    const { palette } = useTheme()
    const pieColors = [palette.primary[800], palette.primary[500]]

    const pieChartData = useMemo(() => {
        if (kpiData) {
            const totalExpenses = kpiData[0].totalExpenses
            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        {
                            name: key,
                            value: value
                        },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses - value
                        }
                    ]
                }
            )
        }
    }, [kpiData])

    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
    ]

    const transactionColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.1,
            renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
        },
    ]

    return (
        <>
            {/* LIST OF PRODUCTS */}
            <DashboardBox gridArea="g">
                <BoxHeader
                    title="Recent Orders"
                    sideText={`${productData?.length} products`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height={"75%"}
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={productData || []}
                        columns={productColumns}
                    />
                </Box>
            </DashboardBox>

            {/* LIST OF TRANSACTIONS */}
            <DashboardBox gridArea="h">
                <BoxHeader
                    title="Recent Orders"
                    sideText={`${transactionData?.length} latest transactions`}
                />
                <Box
                    mt="1rem"
                    p="0 0.5rem"
                    height={"80%"}
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transactionData || []}
                        columns={transactionColumns}
                    />
                </Box>
            </DashboardBox>

            {/* EXPENSE BREAKDOWN BY CATEGORY */}
            <DashboardBox gridArea="i">
                <BoxHeader title='Expense Breakdown By Category' sideText='+4%' />
                <FlexBetween mt={"0.5rem"} gap={"0.5rem"} p="0 1rem" textAlign={"center"}>
                    {pieChartData?.map((data, i) => (
                        <Box key={`${data[0].name}-${i}`}>
                            <PieChart
                                width={80}
                                height={70}
                            >
                                <Pie
                                    stroke="none"
                                    data={data}
                                    innerRadius={18}
                                    outerRadius={35}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={pieColors[index]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant="h5">{ data[0].name }</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </DashboardBox>

            {/* OVERALL SUMMARY */}
            <DashboardBox gridArea="j">
                <BoxHeader title='Overall Summary And Explanation Data' sideText='+15%' />
                <Box
                    height={"15px"}
                    margin="1.25rem 1rem 0.4rem 1rem"
                    bgcolor={palette.primary[800]}
                    borderRadius={"1rem"}
                >
                    <Box
                        height={"15px"}
                        width="40%"
                        bgcolor={palette.primary[600]}
                        borderRadius={"1rem"}
                    />
                    <Typography variant='h6' margin="0.3rem 0">
                        Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam ullamcorper molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare sed. In volutpat nullam at est id cum pulvinar nunc.
                    </Typography>
                </Box>
            </DashboardBox>
        </>
    )
}

export default Row3