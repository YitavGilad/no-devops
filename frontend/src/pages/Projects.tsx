import { useState, useCallback } from 'react';
import { Box, Button, Paper, Typography, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateProjectDialog from '../components/dialogs/CreateProjectDialog';
import LoadingDialog from '../components/dialogs/LoadingDialog';
import ConfirmDialog from '../components/dialogs/ConfirmDialog';

interface Project {
  id: number;
  name: string;
  type: string;
  status: string;
  lastModified: string;
  language: string;
  framework: string;
  published?: boolean;
}

interface ActionsCellProps {
  project: Project;
  onProjectUpdate: (updatedProject: Project) => void;
  onProjectDelete: (projectId: number) => void;
}

function ActionsCell({ project, onProjectUpdate, onProjectDelete }: ActionsCellProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePublish = useCallback(async () => {
    setIsPublishing(true);
    setPublishStatus('loading');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPublishStatus('success');
    setTimeout(() => {
      setIsPublishing(false);
      // Update the project's published status
      const updatedProject = { ...project, published: true };
      onProjectUpdate(updatedProject);
    }, 1500);
  }, [project, onProjectUpdate]);

  const handleUpdate = () => {
    console.log('Update project:', project);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onProjectDelete(project.id);
    setIsDeleting(false);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={1} mt={.5}>
        <Button
          startIcon={project.published ? <ReplayIcon /> : <PublishIcon />}
          onClick={handlePublish}
          variant="contained"
          color={project.published ? 'info' : 'secondary'}
          size="small"
          sx={{ minWidth: '120px' }}
        >
          {project.published ? 'Redeploy' : 'Publish'}
        </Button>
        <Button
          startIcon={<EditIcon />}
          onClick={handleUpdate}
          variant="outlined"
          color="primary"
          size="small"
        >
          Update
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
          variant="outlined"
          color="error"
          size="small"
        >
          Delete
        </Button>
      </Stack>

      <LoadingDialog
        open={isPublishing}
        title={publishStatus === 'loading' ? 'Publishing project...' : 'Published successfully!'}
        status={publishStatus}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteCancel}
        isLoading={isDeleting}
      />
    </>
  );
}

const columns = (onProjectUpdate: (project: Project) => void, onProjectDelete: (projectId: number) => void): GridColDef[] => [
  { field: 'name', headerName: 'Project Name', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'lastModified', headerName: 'Last Modified', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1.5,
    renderCell: (params) => (
      <ActionsCell
        project={params.row as Project}
        onProjectUpdate={onProjectUpdate}
        onProjectDelete={onProjectDelete}
      />
    ),
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
    framework: 'react',
    published: true
  },
  { 
    id: 2, 
    name: 'Blog Platform', 
    type: 'Next.js', 
    status: 'Completed', 
    lastModified: '2024-05-28',
    language: 'javascript',
    framework: 'nextjs',
    published: false
  },
];

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Project[]>(initialRows);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateProject = (newProject: Project) => {
    setRows([...rows, newProject]);
    handleClose();
  };

  const handleProjectUpdate = (updatedProject: Project) => {
    setRows(rows.map(row => row.id === updatedProject.id ? updatedProject : row));
  };

  const handleProjectDelete = (projectId: number) => {
    setRows(rows.filter(row => row.id !== projectId));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Projects</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Create New Project
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns(handleProjectUpdate, handleProjectDelete)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        autoHeight
      />

      <CreateProjectDialog
        open={open}
        onClose={handleClose}
        onCreateProject={handleCreateProject}
      />
    </Paper>
  );
}
