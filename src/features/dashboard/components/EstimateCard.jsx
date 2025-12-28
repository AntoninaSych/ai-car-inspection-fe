import { Box, Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
import { ESTIMATE_STATUS } from '../utils/dashboardFilters';
import { getImageUrl } from '../../../utils/media';
import { ROUTERS } from '../../../constants';
import { getEstimatedCost } from '../utils/estimateCost';
import { formatDate } from '../utils/date';
import { StyledPaper } from '../styled';

function getBadge(status, t) {
  if (status === ESTIMATE_STATUS.COMPLETED) {
    return {
      label: t('status.completed'),
      icon: <CheckCircleIcon fontSize="inherit" />,
      sx: { backgroundColor: 'rgba(46, 204, 113, 0.15)', color: 'success.main' },
    };
  }
  if (status === ESTIMATE_STATUS.PROCESSING) {
    return {
      label: t('status.processing'),
      icon: <HourglassTopIcon fontSize="inherit" />,
      sx: { backgroundColor: 'rgba(255, 159, 67, 0.15)', color: 'warning.main' },
    };
  }
  return {
    label: t('status.paymentRequired'),
    icon: <PaymentsIcon fontSize="inherit" />,
    sx: { backgroundColor: 'rgba(155, 89, 182, 0.15)', color: 'secondary.main' },
  };
}

export function EstimateCard({ item, onViewDetails, t }) {
  const { i18n } = useTranslation();
  const badge = getBadge(item.status, t);
  const createdAt = formatDate(item.createdAt, i18n.language);
  const taskReports = item.reports ?? [];
  const lastReport = taskReports.at(-1);
  const estimatedCost = getEstimatedCost(lastReport, t);

  return (
    <StyledPaper variant="outlined" sx={{ overflow: 'hidden', height: '100%' }}>
      <Box sx={{ position: 'relative', height: 192, backgroundColor: 'white' }}>
        <Box
          component="img"
          src={getImageUrl(item.images[0]?.path)}
          alt={item.model}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            px: 1.2,
            py: 0.6,
            borderRadius: 999,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
            fontSize: 12,
            fontWeight: 700,
            ...badge.sx,
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: badge.sx.color,
            border: '1px solid rgba(0,0,0,0.06)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', fontSize: 14 }}>{badge.icon}</Box>
          {badge.label}
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
          <Box>
            <Typography sx={{ fontWeight: 800 }}>
              {item.brand}, {item.model} ({item.year})
            </Typography>
            {item.description && (
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            )}

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1.2 }}>
              <CalendarMonthIcon fontSize="small" color="disabled" />
              <Typography variant="caption" color="text.secondary">
                {createdAt}
              </Typography>
            </Stack>
          </Box>
          {!item.isPaid && (
            <Button variant="contained" component={RouterLink} to={`${ROUTERS.TASKS_PAY}/${item.id}`}>
              {t('actions.pay')}
            </Button>
          )}
        </Stack>

        {item.isPaid && (
          <>
            <Box sx={{ mt: 1, height: '2px', backgroundColor: theme => theme.palette.neutral[200] }} />

            <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mt: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('card.estimatedCost')}
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 800 }}>{estimatedCost}</Typography>
              </Box>
              <Button variant="contained" onClick={() => onViewDetails?.(lastReport.id)}>
                {t('actions.viewDetails')}
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </StyledPaper>
  );
}
