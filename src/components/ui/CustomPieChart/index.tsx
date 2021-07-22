import { ResponsiveContainer, Cell, Pie, PieChart, PieLabel, Tooltip } from 'recharts';
import { IData } from 'src/models/common';
import theme from 'src/themes/mainTheme';
import ChartContainer from '../ChartContainer';
import { IChart } from '../CustomBarChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart: React.FC<IChart> = ({data, title}) => {
    return (
      <ChartContainer title={title}>
        <PieChart >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </ChartContainer>
    );
}

export default CustomPieChart;
