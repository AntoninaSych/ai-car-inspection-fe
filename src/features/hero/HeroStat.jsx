import { Box, Stack, Typography, Grid } from '@mui/material';

export const HeroStat = ({ value, label }) => {
  return (
    <Grid size={{ xs: 3, lg: 3 }}>
      <Stack spacing={1} justifyContent="strech" sx={{ alignItems: { xs: 'center', lg: 'flex-start' } }}>
        <Typography
          sx={{
            fontSize: { xs: 30, md: 36 },
            lineHeight: 1,
            background: 'linear-gradient(90deg, rgba(57,120,255,1), rgba(168,74,255,1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>

        <Typography sx={{ color: 'rgba(11, 18, 32, 0.62)', fontSize: { xs: 14, md: 16 } }}>{label}</Typography>

        <Box
          sx={{
            mt: 0.5,
            width: '100%',
            maxWidth: '80px',
            height: 4,
            borderRadius: 999,
            background: 'rgba(168,74,255,0.35)',
          }}
        />
      </Stack>
    </Grid>
  );
};
