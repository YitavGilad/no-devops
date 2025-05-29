import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

type Project = {
  id: number;
  name: string;
  type: string;
  status: string;
  lastModified: string;
};

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Project Name', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'lastModified', headerName: 'Last Modified', flex: 1 },
];

const mockProjects: Project[] = [
  { id: 1, name: 'E-commerce App', type: 'React/Node.js', status: 'In Progress', lastModified: '2024-05-29' },
  { id: 2, name: 'Blog Platform', type: 'Next.js', status: 'Completed', lastModified: '2024-05-28' },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

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
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          aria-label="Create new project"
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: 'white',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
          onClick={() => {
            // Placeholder for add project handler
            console.log('Create project clicked');
          }}
        >
          Create New Project
        </Button>
      </Box>

      <Paper elevation={3} sx={{ height: 400, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={projects}
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
