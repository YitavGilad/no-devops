import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Project Name', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'lastModified', headerName: 'Last Modified', flex: 1 },
];

// Temporary mock data - will be replaced with real data from API
const rows = [
  { id: 1, name: 'E-commerce App', type: 'React/Node.js', status: 'In Progress', lastModified: '2024-05-29' },
  { id: 2, name: 'Blog Platform', type: 'Next.js', status: 'Completed', lastModified: '2024-05-28' },
];

export default function Projects() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color="text.primary">
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: (theme) => theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              background: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          Create New Project
        </Button>
      </Box>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
