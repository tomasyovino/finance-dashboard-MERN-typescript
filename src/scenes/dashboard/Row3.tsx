import DashboardBox from '@/components/DashboardBox'

type Props = {}

const Row3 = (props: Props) => {
    return (
        <>
            <DashboardBox gridArea="j"></DashboardBox>
            <DashboardBox gridArea="h"></DashboardBox>
            <DashboardBox gridArea="i"></DashboardBox>
            <DashboardBox gridArea="g"></DashboardBox>
        </>
    )
}

export default Row3