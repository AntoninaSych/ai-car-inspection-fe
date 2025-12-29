import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function DashboardHeader({ isMobile, onCreate, t }) {
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
          <Button variant="gradient" color="primary" onClick={onCreate} size="small" aria-label={t('actions.create')}>
            <AddIcon />
          </Button>
        ) : (
          <Button variant="gradient" startIcon={<AddIcon />} size="medium" onClick={onCreate}>
            {t('actions.create')}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
