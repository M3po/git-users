import { Typography } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";

interface IChartContainer {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>> & React.ReactNode
    title: string
}

const ChartContainer = (props: IChartContainer) => {

    return (
      <>
      <Typography variant="h4">{props.title}</Typography>
        <ResponsiveContainer width={"100%"} height={320}>
            {props.children}
        </ResponsiveContainer>
      </>
    );
}

export default ChartContainer