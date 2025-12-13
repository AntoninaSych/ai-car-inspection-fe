import { Box, Container, Stack, Typography, Button, Chip, Grid } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

export const Hero = ({ onUploadClick, heroMock1x, heroMock2x }) => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        backgroundColor: '#F5F7FF',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(900px 500px at 15% 35%, rgba(72, 140, 255, 0.22), rgba(255,255,255,0) 60%), radial-gradient(700px 420px at 70% 25%, rgba(162, 84, 255, 0.24), rgba(255,255,255,0) 60%)',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 5, md: 6 }} alignItems="center">
          {/* LEFT */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Stack spacing={{ xs: 3, sm: 3.5 }}>
              <Box>
                <Chip
                  icon={<AutoAwesomeOutlinedIcon />}
                  label="AI-Powered Estimation"
                  sx={{
                    height: 42,
                    px: 1.5,
                    borderRadius: 999,
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.92)',
                    background: 'linear-gradient(90deg, rgba(95,145,255,0.95), rgba(178,74,255,0.95))',
                    boxShadow: '0 14px 40px rgba(67, 99, 255, 0.22)',
                    '& .MuiChip-icon': {
                      color: 'rgba(255,255,255,0.92)',
                    },
                  }}
                />
              </Box>

              <Typography
                component="h1"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  fontSize: { xs: 36, sm: 48, md: 60 },
                  color: '#0B1220',
                }}
              >
                Get Car Repair
                <br />
                Estimates in{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(90deg, rgba(57,120,255,1), rgba(168,74,255,1))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Seconds
                </Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: { xs: '100%', lg: '540px' },
                  color: 'rgba(11, 18, 32, 0.62)',
                  fontSize: { xs: 16, sm: 20 },
                  lineHeight: 1.7,
                }}
              >
                Upload a photo of the damage and get an accurate cost estimate powered by artificial intelligence
              </Typography>

              <Box sx={{ pt: 1 }}>
                <Button
                  onClick={onUploadClick}
                  size="large"
                  variant="contained"
                  startIcon={<FileUploadOutlinedIcon />}
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    height: 64,
                    px: 4,
                    borderRadius: 999,
                    textTransform: 'none',
                    fontSize: 18,
                    fontWeight: 600,
                    background: 'linear-gradient(90deg, rgba(57,120,255,1), rgba(168,74,255,1))',
                    boxShadow: '0 18px 50px rgba(67, 99, 255, 0.28)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, rgba(57,120,255,0.95), rgba(168,74,255,0.95))',
                      boxShadow: '0 20px 60px rgba(67, 99, 255, 0.32)',
                    },
                  }}
                >
                  Upload Photo
                </Button>
              </Box>

              {/* Stats */}
              <Grid container spacing={{ xs: 2.5, sm: 3 }} sx={{ pt: { xs: 3.5, sm: 4 } }}>
                <HeroStat value="95%" label="Accuracy" />
                <HeroStat value="&lt;30s" label="Speed" />
                <HeroStat value="50k+" label="Users" />
              </Grid>
            </Stack>
          </Grid>

          {/* RIGHT (desktop only) */}
          <Grid size={{ xs: 12, lg: 6 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box
              sx={{
                position: 'relative',
                ml: { lg: 'auto' },
                width: '100%',
                maxWidth: 560,
              }}
            >
              {/* outer glow */}
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: -24,
                  filter: 'blur(24px)',
                  background:
                    'radial-gradient(420px 240px at 50% 35%, rgba(90, 130, 255, 0.28), rgba(255,255,255,0) 70%), radial-gradient(420px 240px at 70% 10%, rgba(190, 90, 255, 0.25), rgba(255,255,255,0) 70%)',
                }}
              />

              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 6,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  boxShadow: '0 30px 90px rgba(11, 18, 32, 0.18)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* top bar */}
                <Box
                  sx={{
                    height: 64,
                    px: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'linear-gradient(90deg, rgba(57,120,255,1), rgba(168,74,255,1))',
                    color: 'rgba(255,255,255,0.92)',
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        bgcolor: 'rgba(120,255,153,0.95)',
                        boxShadow: '0 0 0 4px rgba(120,255,153,0.18)',
                      }}
                    />
                    <Typography sx={{ fontWeight: 600 }}>Live Analysis</Typography>
                  </Stack>

                  <Chip
                    label="AI Powered"
                    size="small"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      bgcolor: 'rgba(255,255,255,0.18)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      borderRadius: 999,
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {/* mock image */}
                <Box sx={{ p: 2.5 }}>
                  <Box
                    component="img"
                    alt="AI preview"
                    src={heroMock1x}
                    srcSet={`${heroMock1x} 1x, ${heroMock2x} 2x`}
                    sx={{
                      width: '100%',
                      height: 246,
                      objectFit: 'cover',
                      borderRadius: 4,
                      display: 'block',
                      background: 'rgba(0,0,0,0.04)',
                    }}
                  />
                </Box>

                {/* bottom progress */}
                <Box sx={{ px: 3, pb: 3 }}>
                  <Box
                    sx={{
                      height: 10,
                      borderRadius: 999,
                      bgcolor: 'rgba(95, 145, 255, 0.18)',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: '92%',
                        height: '100%',
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, rgba(168,74,255,1), rgba(57,120,255,1))',
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      mt: 1.5,
                      textAlign: 'right',
                      fontWeight: 700,
                      color: 'rgba(57,120,255,1)',
                    }}
                  >
                    98%
                  </Typography>
                </Box>
              </Box>

              {/* floating "parts detected" card */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { md: -40 },
                  bottom: { md: -30 },
                  width: 280,
                  borderRadius: 5,
                  p: 2.5,
                  background: 'rgba(11, 18, 32, 0.88)',
                  border: '3px solid rgba(255,255,255,0.82)',
                  boxShadow: '0 18px 60px rgba(0,0,0,0.28)',
                  backdropFilter: 'blur(10px)',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography sx={{ opacity: 0.7, fontSize: 13 }}>Parts Detected</Typography>
                    <Typography sx={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1 }}>5 Items</Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 3,
                      display: 'grid',
                      placeItems: 'center',
                      background: 'linear-gradient(90deg, rgba(57,120,255,1), rgba(168,74,255,1))',
                    }}
                  >
                    <AutoAwesomeOutlinedIcon />
                  </Box>
                </Stack>

                <Stack spacing={1.2} sx={{ mt: 2 }}>
                  {['Front Bumper', 'Headlight', 'Hood', 'Grille', 'Fender'].map(t => (
                    <Stack key={t} direction="row" spacing={1.2} alignItems="center">
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: 999,
                          bgcolor: 'rgba(168,74,255,0.95)',
                        }}
                      />
                      <Typography sx={{ fontSize: 14, opacity: 0.9 }}>{t}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

function HeroStat({ value, label }) {
  return (
    <Grid size={{ xs: 3 }}>
      <Stack spacing={1} alignItems="center">
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: 38, sm: 44 },
            lineHeight: 1,
            background: 'linear-gradient(90deg, rgba(57,120,255,1), rgba(168,74,255,1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>

        <Typography sx={{ color: 'rgba(11, 18, 32, 0.62)', fontWeight: 500 }}>{label}</Typography>

        <Box
          sx={{
            mt: 0.5,
            width: 64,
            height: 4,
            borderRadius: 999,
            background: 'rgba(168,74,255,0.35)',
          }}
        />
      </Stack>
    </Grid>
  );
}
