import { Box, Stack, Typography } from '@mui/material';
import { StyledPaper } from '../styled';

export function StatCard({ icon, value, label, iconBgColor, iconColor, variant = 'default' }) {
  const isGradient = variant === 'gradient';

  return (
    <StyledPaper
      variant="outlined"
      isgradient={isGradient ? 'true' : undefined}
      sx={{
        p: 2,
        height: '100%',
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
            backgroundColor: isGradient ? 'rgba(255,255,255,0.2)' : iconBgColor,
            color: iconColor,
          }}
        >
          {icon}
        </Box>
      </Stack>

      <Typography sx={{ mt: 2, fontSize: 28, fontWeight: 700 }}>{value}</Typography>
      <Typography variant="body2" sx={{ opacity: isGradient ? 0.9 : 0.7 }}>
        {label}
      </Typography>
    </StyledPaper>
  );
}
