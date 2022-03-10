import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../components/charts';
//
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

export default function ActivityGraph({ chartData }) {
  const labels = [];
  for (let i = 0; i < 30; i += 1) {
    const date = new Date(new Date().setDate(new Date().getDate() - i));
    labels[i] = date.toLocaleDateString('en');
  }

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels,
    yaxis: { show: false },
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y, dataPoint) => {
          if (typeof y !== 'undefined') {
            return `${fShortenNumber(y.toFixed(0) * [1000 / 3, 10, 1][dataPoint.seriesIndex])} ${
              ['steps', 'calories', 'oz'][dataPoint.seriesIndex]
            }`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Water Drunk" subheader="Shown over Time" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

ActivityGraph.propTypes = {
  chartData: PropTypes.array.isRequired
};
