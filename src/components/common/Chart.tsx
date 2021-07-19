import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IChartData } from 'src/models/IChart';
import theme from 'src/themes/mainTheme';

interface IChart {
    data: IChartData[]
    dataName: string
}

const Chart: React.FC<IChart> = ({data, dataName}) => {

    return (
      <ResponsiveContainer width={"100%"} height={375}>
        <BarChart
          data={data}
          margin={{
            top: theme.spacing(4),
            right: theme.spacing(4),
            left: theme.spacing(1),
            bottom: theme.spacing(2),
          }}
        >
          <CartesianGrid strokeDasharray="3 3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={"value"} name={dataName} fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    );
}

export default Chart;
