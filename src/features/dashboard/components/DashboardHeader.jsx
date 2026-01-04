import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../../constants';

export const DashboardHeader = () => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOnCreate = () => {
    navigate(ROUTERS.UPLOAD);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
        <Box>
          <Typography variant="h2">{t('title')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('subtitle')}
          </Typography>
        </Box>

        {isMobile ? (
          <Button
            variant="gradient"
            color="primary"
            onClick={handleOnCreate}
            size="small"
            aria-label={t('actions.create')}
          >
            <AddIcon />
          </Button>
        ) : (
          <Button variant="gradient" startIcon={<AddIcon />} size="medium" onClick={handleOnCreate}>
            {t('actions.create')}
          </Button>
        )}
      </Stack>
    </Box>
  );
};
