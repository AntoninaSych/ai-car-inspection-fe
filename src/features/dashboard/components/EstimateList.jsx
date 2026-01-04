import { Grid, Stack } from '@mui/material';
import { EstimateCard } from './EstimateCard';

export function EstimateList({ items, isMobile, onViewDetails, t }) {
  if (isMobile) {
    return (
      <Stack spacing={2}>
        {items.map(item => (
          <EstimateCard key={item.id} item={item} onViewDetails={onViewDetails} t={t} />
        ))}
      </Stack>
    );
  }

  return (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid key={item.id} size={{ xs: 12, md: 6 }}>
          <EstimateCard item={item} onViewDetails={onViewDetails} t={t} />
        </Grid>
      ))}
    </Grid>
  );
}
