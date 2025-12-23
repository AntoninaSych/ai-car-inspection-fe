import { Box, Stack, Typography, Button, Chip, Grid } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageContainer, Section } from '../../layouts';
import { HeroStat } from './HeroStat';
import { openModal } from '../../redux/modal/slice';
import { ROUTERS } from '../../constants';
import { selectIsAuthorized } from '../../redux/auth/selectors';
import heroMock1x from '@/assets/hero/hero-mock.png';
import heroMock2x from '@/assets/hero/hero-mock@2x.png';

export const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const { t } = useTranslation('hero');

  const handleOnClick = () => {
    if (!isAuthorized) {
      dispatch(openModal({ type: 'auth' }));
      return;
    }
    navigate(ROUTERS.UPLOAD);
  };

  return (
    <Section
      container={false}
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
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

      <PageContainer sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 2, md: 8, lg: 10 }} alignItems="center">
          {/* LEFT */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Stack spacing={{ xs: 3, sm: 3.5 }}>
              <Box>
                <Chip
                  icon={<AutoAwesomeOutlinedIcon />}
                  label={t('hero:badge')}
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
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  fontSize: { xs: 36, sm: 48, md: 60 },
                  color: '#0F172B',
                }}
              >
                <Trans i18nKey="hero:title">
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
                </Trans>
              </Typography>

              <Typography
                sx={{
                  maxWidth: { xs: '100%', md: '540px' },
                  color: 'rgba(11, 18, 32, 0.62)',
                  fontSize: { xs: 16, sm: 20 },
                  lineHeight: 1.7,
                }}
              >
                {t('hero:description')}
              </Typography>
              <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
                <Box sx={{ pt: 1 }}>
                  <Button
                    onClick={handleOnClick}
                    size="large"
                    startIcon={<FileUploadOutlinedIcon />}
                    endIcon={<ArrowForwardRoundedIcon />}
                  >
                    {t('hero:cta')}
                  </Button>
                </Box>

                {/* Stats */}
                <Grid
                  container
                  spacing={{ xs: 2.5, sm: 3 }}
                  sx={{ pt: { xs: 3.5, sm: 4 }, justifyContent: { xs: 'center', lg: 'flex-start' } }}
                >
                  <HeroStat value="95%" label={t('hero:stats.accuracy')} />
                  <HeroStat value="&lt;30s" label={t('hero:stats.speed')} />
                  <HeroStat value="50k+" label={t('hero:stats.users')} />
                </Grid>
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT (desktop only) */}
          <Grid size={{ xs: 12, lg: 6 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box
              sx={{
                position: 'relative',
                ml: { lg: 'auto' },
                width: '100%',
                maxWidth: '544px',
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
                    height: 76,
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
                    <Typography sx={{ fontWeight: 600 }}>{t('hero:live.title')}</Typography>
                  </Stack>

                  <Chip
                    label={t('hero:live.aiPowered')}
                    size="small"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      borderRadius: 999,
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Box sx={{ p: 3 }}>
                  <Box
                    component="img"
                    alt={t('hero:live.aiPreview')}
                    src={heroMock1x}
                    srcSet={`${heroMock1x} 1x, ${heroMock2x} 2x`}
                    sx={{
                      width: '100%',
                      height: { xs: 226, xl: 256 },
                      objectFit: 'cover',
                      borderRadius: 4,
                      display: 'block',
                      background: '#FFFFFF',
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
                    {t('hero:live.progress')}
                  </Typography>
                </Box>
              </Box>

              {/* floating "parts detected" card */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { md: -54 },
                  bottom: { md: -54 },
                  width: 280,
                  borderRadius: 5,
                  p: 2.5,
                  background: theme => theme.palette.neutral[900],
                  border: '3px solid rgba(255,255,255,0.82)',
                  boxShadow: '0 18px 60px rgba(0,0,0,0.28)',
                  backdropFilter: 'blur(10px)',
                  color: '#CAD5E2',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography sx={{ opacity: 0.8, fontSize: 12 }}>{t('hero:parts.title')}</Typography>
                    <Typography sx={{ mt: 0.5, fontSize: 28, fontWeight: 800, lineHeight: 1.1, color: '#FFFFFF' }}>
                      {t('hero:parts.itemsCount')}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(90deg, rgba(57,120,255,1), rgba(168,74,255,1))',
                    }}
                  >
                    <ShieldOutlinedIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />
                  </Box>
                </Stack>

                <Stack spacing={1.2} sx={{ mt: 2 }}>
                  {t('hero:parts.list', { returnObjects: true }).map((t, index) => (
                    <Stack key={t} direction="row" spacing={1.2} alignItems="center">
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: 999,
                          boxShadow: '0 0 2px 3px rgba(255,255,255,0.06)',
                          backgroundColor: index % 2 === 0 ? '#51A2FF' : '#C27AFF',
                        }}
                      />
                      <Typography sx={{ fontSize: 12, opacity: 0.9 }}>{t}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </PageContainer>
    </Section>
  );
};
