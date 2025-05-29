import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

  const chartData = {
    labels: mockStats.activityData.labels,
    datasets: [
      {
        label: 'Project Activity',
        data: mockStats.activityData.values,
        borderColor: theme.palette.primary.main,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Project Statistics',
      },
    },
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h4" color="text.primary">
          Statistics
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ height: 400, width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Project Activity
          </Typography>
          <Box sx={{ height: 300 }}>
            <Line data={chartData} options={options} />
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Key Metrics
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Total Projects: {mockStats.totalProjects}
            </Typography>
            <Typography variant="body1">
              Active Projects: {mockStats.activeProjects}
            </Typography>
            <Typography variant="body1">
              Completed Projects: {mockStats.completedProjects}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Statistics;
