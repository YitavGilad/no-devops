import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import {
  Language as LanguageIcon,
  Javascript as JavascriptIcon,
  Code as PythonIcon,
  Coffee as JavaIcon,
} from '@mui/icons-material';

// Language options with their associated frameworks
const languageOptions = {
  javascript: {
    name: 'JavaScript',
    icon: JavascriptIcon,
    frameworks: [
      { id: 'react', name: 'React', image: '/icons/react.svg' },
      { id: 'nextjs', name: 'Next.js', image: '/icons/nextjs.svg' },
      { id: 'angular', name: 'Angular', image: '/icons/angular.svg' },
      { id: 'vue', name: 'Vue.js', image: '/icons/vue.svg' },
    ],
  },
  python: {
    name: 'Python',
    icon: PythonIcon,
    frameworks: [
      { id: 'fastapi', name: 'FastAPI', image: '/icons/fastapi.svg' },
      { id: 'flask', name: 'Flask', image: '/icons/flask.svg' },
      { id: 'django', name: 'Django', image: '/icons/django.svg' },
    ],
  },
  java: {
    name: 'Java',
    icon: JavaIcon,
    frameworks: [
      { id: 'spring', name: 'Spring Boot', image: '/icons/spring.svg' },
      { id: 'quarkus', name: 'Quarkus', image: '/icons/quarkus.svg' },
      { id: 'micronaut', name: 'Micronaut', image: '/icons/micronaut.svg' },
    ],
  },
};

type Step = 'language' | 'framework' | 'details';

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (projectData: {
    name: string;
    language: string;
    framework: string;
  }) => void;
}

export default function CreateProjectDialog({ open, onClose, onSave }: CreateProjectDialogProps) {
  const [step, setStep] = useState<Step>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setStep('framework');
  };

  const handleFrameworkSelect = (framework: string) => {
    setSelectedFramework(framework);
    setStep('details');
  };

  const handleSave = () => {
    if (selectedLanguage && selectedFramework && projectName) {
      onSave({
        name: projectName,
        language: selectedLanguage,
        framework: selectedFramework,
      });
      handleReset();
    }
  };

  const handleReset = () => {
    setStep('language');
    setSelectedLanguage(null);
    setSelectedFramework(null);
    setProjectName('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <LanguageIcon />
          <Typography>Create New Project</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        {step === 'language' && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Select Programming Language
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              {Object.entries(languageOptions).map(([key, { name, icon: Icon }]) => (
                <Box key={key} gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <CardActionArea onClick={() => handleLanguageSelect(key)}>
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <Icon sx={{ fontSize: 48 }} />
                          <Typography>{name}</Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              ))}
            </Box>
          </>
        )}

        {step === 'framework' && selectedLanguage && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Select Framework
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              {languageOptions[selectedLanguage as keyof typeof languageOptions].frameworks.map(
                (framework) => (
                  <Box key={framework.id} gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                      }}
                    >
                      <CardActionArea onClick={() => handleFrameworkSelect(framework.id)}>
                        <CardContent>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Box
                              component="img"
                              src={framework.image}
                              alt={framework.name}
                              sx={{
                                width: 48,
                                height: 48,
                                objectFit: 'contain',
                              }}
                            />
                            <Typography>{framework.name}</Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Box>
                )
              )}
            </Box>
          </>
        )}

        {step === 'details' && (
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              label="Project Name"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              Selected Stack: {languageOptions[selectedLanguage as keyof typeof languageOptions].name} with{' '}
              {
                languageOptions[selectedLanguage as keyof typeof languageOptions].frameworks.find(
                  (f) => f.id === selectedFramework
                )?.name
              }
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {step !== 'language' && (
          <Button onClick={() => setStep(step === 'details' ? 'framework' : 'language')}>Back</Button>
        )}
        {step === 'details' && (
          <Button onClick={handleSave} variant="contained" disabled={!projectName.trim()}>
            Create Project
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
