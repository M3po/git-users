import { makeStyles, Theme, Typography } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";

interface IChartContainer {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>> & React.ReactNode
    title: string
    height?: number
}

const ChartContainer = (props: IChartContainer) => {
    const { title, children, height } = props
    const classes = useStyles();
    return (
      <>
      <Typography variant="h4" className={classes.title}>{title}</Typography>
        <ResponsiveContainer width={"100%"} height={height ? height: 320}>
            {children}
        </ResponsiveContainer>
      </>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginBottom: theme.spacing(3)
    }
}))

export default ChartContainer