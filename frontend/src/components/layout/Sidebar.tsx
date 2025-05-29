import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { FolderOutlined, AnalyticsOutlined } from '@mui/icons-material';
import { customStyles } from '../../theme/theme';
import { Link, useLocation } from 'react-router-dom';

const { sidebarWidth } = customStyles.layout;

export default function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
          Vibe Coding
        </Typography>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            selected={location.pathname === '/'}
          >
            <ListItemIcon>
              <FolderOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/statistics"
            selected={location.pathname === '/statistics'}
          >
            <ListItemIcon>
              <AnalyticsOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
