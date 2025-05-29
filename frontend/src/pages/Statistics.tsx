import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mockStats = {
  totalProjects: 15,
  activeProjects: 12,
  completedProjects: 3,
  activityData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [65, 59, 80, 81, 56, 55, 40],
  },
};

const Statistics: React.FC = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const chartData = {
    labels: mockStats.activityData.labels,
    datasets: [
      {
        label: 'Project Activity',
        data: mockStats.activityData.values,
        fill: true,
        backgroundColor: `${theme.palette.primary.main}20`,
        borderColor: theme.palette.primary.main,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.palette.text.primary,
        },
      },
      title: {
        display: true,
        text: 'Project Activity Over Time',
        color: theme.palette.text.primary,
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: theme.palette.text.secondary },
        grid: { display: false },
      },
      y: {
        ticks: { color: theme.palette.text.secondary },
        grid: {
          color: `${theme.palette.divider}`,
        },
      },
    },
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Statistics
      </Typography>

      {/* Responsive layout using Box instead of Grid */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {/* Chart Section */}
        <Box sx={{ flex: 2, minWidth: '300px' }}>
          <Paper elevation={4} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Project Activity
            </Typography>
            <Box sx={{ height: isSmall ? 250 : 350 }}>
              <Line data={chartData} options={chartOptions} />
            </Box>
          </Paper>
        </Box>

        {/* Metrics Section */}
        <Box sx={{ flex: 1, minWidth: '280px' }}>
          <Paper elevation={4} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Key Metrics
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                }}
              >
                <Typography variant="body2">Total Projects</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {mockStats.totalProjects}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.success.light,
                  color: theme.palette.success.contrastText,
                }}
              >
                <Typography variant="body2">Active Projects</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {mockStats.activeProjects}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.info.light,
                  color: theme.palette.info.contrastText,
                }}
              >
                <Typography variant="body2">Completed Projects</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {mockStats.completedProjects}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Statistics;
