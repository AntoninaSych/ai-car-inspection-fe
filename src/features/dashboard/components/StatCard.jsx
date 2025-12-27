import { Box, Paper, Stack, Typography } from '@mui/material';

export function StatCard({ icon, value, label, iconBgcolor, variant = 'default' }) {
  const isGradient = variant === 'gradient';

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        height: '100%',
        ...(isGradient
          ? {
              border: 'none',
              color: 'common.white',
              background: 'linear-gradient(135deg, rgba(44,84,255,1), rgba(138,43,226,1))',
            }
          : { background: '#FFFFFF', borderColor: '#E2E8F0', borderWidth: 2, borderStyle: 'solid' }),
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            backgroundColor: isGradient ? 'rgba(255,255,255,0.2)' : iconBgcolor,
          }}
        >
          {icon}
        </Box>
      </Stack>

      <Typography sx={{ mt: 2, fontSize: 28, fontWeight: 700 }}>{value}</Typography>
      <Typography variant="body2" sx={{ opacity: isGradient ? 0.9 : 0.7 }}>
        {label}
      </Typography>
    </Paper>
  );
}
