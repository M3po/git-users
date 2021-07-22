import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IData } from 'src/models/common';
import theme from 'src/themes/mainTheme';
import ChartContainer from '../ChartContainer';

export interface IChart {
    data: IData[]
    dataName: string
    title: string
}

const CustomBarChart: React.FC<IChart> = ({data, dataName, title}) => {

    return (
      <ChartContainer title={title}>
        <BarChart
          data={data}
          margin={{
            top: theme.spacing(0),
            right: theme.spacing(0),
            left: theme.spacing(0),
            bottom: theme.spacing(3),
          }}
        >
          <CartesianGrid strokeDasharray="3 3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={"value"} name={dataName} fill={theme.palette.primary.main} />
        </BarChart>
        </ChartContainer>
    );
}

export default CustomBarChart;
