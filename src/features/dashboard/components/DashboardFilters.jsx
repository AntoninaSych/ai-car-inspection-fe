import { Stack, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { StatusTabs } from './StatusTabs';
import { StyledPaper } from '../styled';

export function DashboardFilters({ query, onQueryChange, status, onStatusChange, counters, t }) {
  return (
    <StyledPaper variant="outlined" sx={{ p: 2 }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={2} alignItems="center">
        <TextField
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder={t('search.placeholder')}
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            '& .MuiFilledInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <StatusTabs value={status} onChange={onStatusChange} counters={counters} t={t} />
      </Stack>
    </StyledPaper>
  );
}
