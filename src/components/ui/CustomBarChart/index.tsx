import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { IData } from 'src/models/common';
import theme from 'src/themes/mainTheme';
import ChartContainer from 'src/components/ui/ChartContainer';

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
            bottom: theme.spacing(3),
          }}
        >
          <CartesianGrid strokeDasharray="3 3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false}/>
          <Tooltip />
          <Legend />
          <Bar dataKey={"value"} name={dataName} fill={theme.palette.primary.main} />
        </BarChart>
        </ChartContainer>
    );
}

export default CustomBarChart;
