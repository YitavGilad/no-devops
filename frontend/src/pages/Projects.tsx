import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import CreateProjectDialog from '../components/dialogs/CreateProjectDialog';

interface Project {
  id: number;
  name: string;
  type: string;
  status: string;
  lastModified: string;
  language: string;
  framework: string;
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Project Name', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'lastModified', headerName: 'Last Modified', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => {
      const handlePublish = () => {
        // For now, just console.log the project data
        console.log('Publishing project:', params.row);
      };

      return (
        <Button
          startIcon={<PublishIcon />}
          onClick={handlePublish}
          variant="contained"
          color="secondary"
          size="small"
        >
          Publish
        </Button>
      );
    },
  },
];

// Temporary mock data - will be replaced with real data from API
const initialRows: Project[] = [
  { 
    id: 1, 
    name: 'E-commerce App', 
    type: 'React/Node.js', 
    status: 'In Progress', 
    lastModified: '2024-05-29',
    language: 'javascript',
    framework: 'react'
  },
  { 
    id: 2, 
    name: 'Blog Platform', 
    type: 'Next.js', 
    status: 'Completed', 
    lastModified: '2024-05-28',
    language: 'javascript',
    framework: 'nextjs'
  },
];

export default function Projects() {
  const [rows, setRows] = useState<Project[]>(initialRows);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateProject = (projectData: { name: string; language: string; framework: string }) => {
    const newProject: Project = {
      id: rows.length + 1,
      name: projectData.name,
      type: `${projectData.framework}`,
      status: 'Not Started',
      lastModified: new Date().toISOString().split('T')[0],
      language: projectData.language,
      framework: projectData.framework,
    };

    setRows([...rows, newProject]);
    setIsCreateDialogOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color="text.primary">
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateDialogOpen(true)}
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
          disableRowSelectionOnClick
        />
      </Paper>

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateProject}
      />
    </Box>
  );
}
