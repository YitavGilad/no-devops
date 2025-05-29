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
import { FolderOutlined } from '@mui/icons-material';
import { customStyles } from '../../theme/theme';

const { sidebarWidth } = customStyles.layout;

export default function Sidebar() {
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
          <ListItemButton selected>
            <ListItemIcon>
              <FolderOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
