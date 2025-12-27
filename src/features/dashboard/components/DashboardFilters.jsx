import { Paper, Stack, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { StatusTabs } from './StatusTabs';

export function DashboardFilters({ query, onQueryChange, status, onStatusChange, counters, t }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        background: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderWidth: 2,
        borderStyle: 'solid',
      }}
    >
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
            '& .MuiOutlinedInput-root': { borderRadius: 999 },
          }}
        />

        <StatusTabs value={status} onChange={onStatusChange} counters={counters} t={t} />
      </Stack>
    </Paper>
  );
}
