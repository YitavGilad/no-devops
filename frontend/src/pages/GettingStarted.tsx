import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const StyledCard = muiStyled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
}));

const FeatureIcon = muiStyled(CardMedia)({
  bgcolor: '#007bff',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '140px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '16px 16px 0 0',
});

const GettingStarted: React.FC = () => {
  const features = [
    {
      title: 'Project Management',
      description: 'Create and manage your projects with ease. Track progress and get insights into your development workflow.',
      icon: '/icons/project.svg',
      link: '/projects',
    },
    {
      title: 'Statistics & Analytics',
      description: 'Get detailed insights into your projects with our comprehensive statistics dashboard.',
      icon: '/icons/analytics.svg',
      link: '/statistics',
    },
    {
      title: 'Dockerfile Visualizer',
      description: 'Visualize and analyze your Dockerfiles. Parse and understand container configurations easily.',
      icon: '/icons/docker.svg',
      link: '/dockerfile',
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: '100vh',
        bgcolor: 'background.default',
        background: `linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)`, // Using hardcoded colors for now
      }}
    >
      <Typography 
        variant="h3" 
        gutterBottom 
        component="h1" 
        align="center"
        sx={{
          fontWeight: 700,
          mb: 2,
          textTransform: 'uppercase',
          background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)', // Using hardcoded colors for now
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Getting Started
      </Typography>

      <Typography 
        variant="h6" 
        color="text.secondary" 
        align="center" 
        paragraph
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          mb: 4,
          fontSize: { xs: '1rem', sm: '1.1rem' },
          lineHeight: 1.6,
        }}
      >
        Welcome to your development dashboard. Here's how to get started with our features.
      </Typography>

      <Grid 
        container 
        spacing={4} 
        sx={{ 
          mt: 4,
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {features.map((feature) => (
            <StyledCard key={feature.title} sx={{ height: '100%', maxWidth: '400px' }}>
              <FeatureIcon
                image={feature.icon}
              />
              <CardContent sx={{ p: 4 }}>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#007bff',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.6,
                    mb: 3,
                  }}
                >
                  {feature.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  component={RouterLink}
                  to={feature.link}
                  sx={{
                    mt: 3,
                    px: 4,
                    borderRadius: '24px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </StyledCard>
          ))}
      </Grid>
    </Box>
  );
};

export default GettingStarted;
