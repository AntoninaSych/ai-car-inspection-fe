import { Box, Paper, Stack, Typography } from '@mui/material';

export const WhyChooseUsCard = ({ title, description, Icon, borderColor, bgColor, iconBg }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        borderRadius: 2,
        border: '4px solid',
        borderColor,
        background: bgColor,
        px: 2,
        py: 3,
      }}
    >
      <Stack alignItems="center" textAlign="center">
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            background: iconBg,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Icon sx={{ color: '#fff', fontSize: 28 }} />
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
            color: 'text.primary',
            mt: 2,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: 'text.secondary',
            mt: 1,
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Paper>
  );
};
