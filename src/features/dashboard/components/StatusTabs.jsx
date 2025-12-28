import { Stack, Chip } from '@mui/material';
import { STATUS_TABS } from '../utils/dashboardFilters';

export function StatusTabs({ value, onChange, counters, t }) {
  const countsMap = {
    all: counters?.total ?? 0,
    completed: counters?.completed ?? 0,
    processing: counters?.processing ?? 0,
    payment: counters?.payment ?? 0,
  };

  return (
    <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
      {STATUS_TABS.map(tab => {
        const count = countsMap[tab.value] ?? 0;
        const selected = tab.value === value;

        return (
          <Chip
            key={tab.value}
            label={`${t(tab.i18nKey)} (${count})`}
            onClick={() => onChange(tab.value)}
            variant={selected ? 'filled' : 'outlined'}
            color={selected ? 'primary' : 'default'}
            sx={{
              borderRadius: 999,
              fontWeight: selected ? 700 : 500,
              ...(selected
                ? {
                    border: 'none',
                    color: 'common.white',
                    background: 'linear-gradient(135deg, rgba(44,84,255,1), rgba(138,43,226,1))',
                  }
                : {}),
            }}
          />
        );
      })}
    </Stack>
  );
}
