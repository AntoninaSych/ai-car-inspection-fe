import {
  Box,
  Grid,
  CardContent,
  Typography,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DoneIcon from '@mui/icons-material/Done';
import { StyledCard } from '../../styled';
import { StyledAccordion } from './styled';

const severityColor = severity => {
  switch (severity) {
    case 'minor':
      return 'success';
    case 'moderate':
      return 'warning';
    case 'severe':
      return 'error';
    default:
      return 'default';
  }
};

const severityLabel = (severity, t) => {
  switch (severity) {
    case 'minor':
      return t('severity.minor', 'Легке');
    case 'moderate':
      return t('severity.moderate', 'Середнє');
    case 'severe':
      return t('severity.severe', 'Серйозне');
    default:
      return severity;
  }
};

export const Report = ({ report, t }) => {
  if (!report) {
    return (
      <Box p={3}>
        <Alert severity="info">{t('loading', 'Завантажуємо звіт...')}</Alert>
      </Box>
    );
  }

  const {
    summary,
    damageDetected,
    recommendations = [],
    estimatedTotalLaborCost,
    estimatedTotalPartsCostOriginal,
    estimatedTotalPartsCostAlternative,
    damages = [],
  } = report;

  return (
    <Box>
      {/* Status */}
      <Box mb={3}>
        {damageDetected ? (
          <Alert icon={<ErrorIcon />} severity="warning" variant="outlined">
            {t('damageDetected', 'Damage has been detected. Below are the details and the estimated repair costs.')}
          </Alert>
        ) : (
          <Alert icon={<CheckCircleIcon />} severity="success" variant="outlined">
            {t('noDamageDetected', 'No significant damage detected based on the provided photos.')}
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Summary + totals */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Summary */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <InfoOutlinedIcon fontSize="small" />
              <Typography variant="h6">{t('summaryTitle', 'AI Summary')}</Typography>
            </Stack>
            <Typography variant="body1">{summary}</Typography>
          </Box>
        </Grid>

        {/* totals */}
        <Grid size={{ xs: 12, md: 4 }}>
          <StyledCard variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('costSummaryTitle', 'Preliminary Cost Estimate')}
              </Typography>

              <Stack spacing={2}>
                {estimatedTotalLaborCost && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {t('totalLabor', 'Labor')}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {estimatedTotalLaborCost}
                    </Typography>
                  </Box>
                )}

                {estimatedTotalPartsCostOriginal && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {t('totalPartsOriginal', 'Parts (original)')}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {estimatedTotalPartsCostOriginal}
                    </Typography>
                  </Box>
                )}

                {estimatedTotalPartsCostAlternative && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {t('totalPartsAlternative', 'Parts (alternative)')}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {estimatedTotalPartsCostAlternative}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Damages list */}
      {damages.length > 0 && (
        <StyledAccordion sx={{ mt: 4 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="damages-content" id="damages-header">
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: '100%' }}
            >
              <Typography variant="h6" gutterBottom>
                {t('damagesTitle', 'Detected Damages')}
              </Typography>
              <Chip size="small" label={damages.length} color="primary" variant="outlined" />
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              {damages.map((damage, index) => (
                <Box key={index}>
                  {index > 0 && <Divider sx={{ mb: 2 }} />}

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={1}
                    mb={1}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {damage.location}
                    </Typography>
                    {damage.severity && (
                      <Chip
                        size="small"
                        label={severityLabel(damage.severity, t)}
                        color={severityColor(damage.severity)}
                      />
                    )}
                  </Stack>

                  <Typography variant="body2" color="text.secondary" mb={1.5}>
                    {damage.description}
                  </Typography>

                  <Grid container spacing={2}>
                    {damage.estimatedLaborCost && (
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="caption" color="text.secondary">
                          {t('damage.labor', 'Labor')}
                        </Typography>
                        <Typography variant="body2">{damage.estimatedLaborCost}</Typography>
                      </Grid>
                    )}
                    {damage.estimatedPartsCostOriginal && (
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="caption" color="text.secondary">
                          {t('damage.partsOriginal', 'Parts (original)')}
                        </Typography>
                        <Typography variant="body2">{damage.estimatedPartsCostOriginal}</Typography>
                      </Grid>
                    )}
                    {damage.estimatedPartsCostAlternative && (
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="caption" color="text.secondary">
                          {t('damage.partsAlternative', 'Parts (alternative)')}
                        </Typography>
                        <Typography variant="body2">{damage.estimatedPartsCostAlternative}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              ))}
            </Stack>
          </AccordionDetails>
        </StyledAccordion>
      )}

      {recommendations.length > 0 && (
        <StyledCard sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('recommendationsTitle', 'Recommended Next Steps')}
            </Typography>

            <List dense>
              {recommendations.map((recommendation, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <DoneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={recommendation} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </StyledCard>
      )}
    </Box>
  );
};
