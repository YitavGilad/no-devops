import { Dialog, DialogContent, Box, Typography, CircularProgress, Fade } from '@mui/material';
import { keyframes } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface LoadingDialogProps {
  open: boolean;
  title: string;
  status: 'loading' | 'success' | 'error';
  message?: string;
}

// Define keyframes
const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const popInAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.1); opacity: 0.8; }
  80% { transform: scale(0.9); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  15%, 45% { transform: translateX(-5px) rotate(-5deg); }
  30%, 60% { transform: translateX(5px) rotate(5deg); }
  75% { transform: translateX(-2px) rotate(-2deg); }
  90% { transform: translateX(2px) rotate(2deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(0.95); }
`;

export default function LoadingDialog({ open, title, status, message }: LoadingDialogProps) {
  return (
    <Dialog 
      open={open} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: (theme) => `0 8px 32px 0 ${theme.palette.primary.main}20`,
          background: (theme) => 
            status === 'success' ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.success.light}10 100%)` :
            status === 'error' ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.error.light}10 100%)` :
            theme.palette.background.paper,
          transition: 'all 0.3s ease-in-out'
        }
      }}
    >
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={4}
          gap={2}
        >
          {status === 'loading' && (
            <Fade in={true} timeout={400}>
              <Box
                sx={{
                  position: 'relative',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CircularProgress
                  size={80}
                  thickness={2}
                  sx={{
                    position: 'absolute',
                    animation: `${rotateAnimation} 2s linear infinite`,
                    color: 'primary.light'
                  }}
                />
                <CircularProgress
                  size={60}
                  thickness={3}
                  sx={{
                    position: 'absolute',
                    animation: `${rotateAnimation} 1.5s linear infinite reverse`,
                    color: 'primary.main'
                  }}
                />
                <CircularProgress
                  size={40}
                  thickness={4}
                  sx={{
                    position: 'absolute',
                    animation: `${rotateAnimation} 1s linear infinite`,
                    color: 'primary.dark'
                  }}
                />
              </Box>
            </Fade>
          )}
          {status === 'success' && (
            <Fade in={true} timeout={400}>
              <CheckCircleIcon
                sx={{
                  fontSize: 80,
                  color: 'success.main',
                  animation: `${popInAnimation} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
                  filter: 'drop-shadow(0 4px 8px rgba(0, 200, 83, 0.2))'
                }}
              />
            </Fade>
          )}
          {status === 'error' && (
            <Fade in={true} timeout={400}>
              <ErrorIcon
                sx={{
                  fontSize: 80,
                  color: 'error.main',
                  animation: `${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both`,
                  filter: 'drop-shadow(0 4px 8px rgba(244, 67, 54, 0.2))'
                }}
              />
            </Fade>
          )}
          <Fade in={true} timeout={600}>
            <Typography 
              variant="h6" 
              align="center"
              sx={{
                animation: status === 'loading' ? `${pulseAnimation} 2s ease-in-out infinite` : 'none',
                color: (theme) => 
                  status === 'success' ? theme.palette.success.main :
                  status === 'error' ? theme.palette.error.main :
                  theme.palette.text.primary
              }}
            >
              {title}
            </Typography>
          </Fade>
          {message && (
            <Fade in={true} timeout={800}>
              <Typography 
                variant="body2" 
                align="center" 
                color="text.secondary"
                sx={{ maxWidth: '80%', mx: 'auto' }}
              >
                {message}
              </Typography>
            </Fade>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
