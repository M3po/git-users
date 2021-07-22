import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import ChartContainer from 'src/components/ui/ChartContainer';
import { IChart } from 'src/components/ui/CustomBarChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart: React.FC<IChart> = ({data, title}) => {
    return (
      <ChartContainer title={title} height={230}>
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
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </ChartContainer>
    );
}

export default CustomPieChart;
