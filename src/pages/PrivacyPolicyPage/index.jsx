import { Typography, Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Section } from '../../layouts';
import { getNormalizedLang } from '../../utils/languages';

export const PrivacyPolicyPage = () => {
  const { i18n, t } = useTranslation('privacyPolicy');
  const lang = getNormalizedLang(i18n.resolvedLanguage);
  const fileLink = `/assets/privacy-policy/${lang}-privacy-policy.pdf`;

  return (
    <>
      <Section
        container
        sx={{
          background:
            'radial-gradient(900px 500px at 15% 35%, rgba(72, 140, 255, 0.22), rgba(255,255,255,0) 60%), radial-gradient(700px 420px at 70% 25%, rgba(162, 84, 255, 0.24), rgba(255,255,255,0) 60%)',
        }}
      >
        <Typography variant="h1" align="center">
          {t('title')}
        </Typography>
      </Section>
      <Section container containerProps={{ maxWidth: 'lg' }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3">{t('content.title')}</Typography>
          <Typography sx={{ mt: 1 }}>{t('content.text')}</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3">{t('download.title')}</Typography>
          <Typography sx={{ mt: 1 }}>{t('download.text')}</Typography>
          <Stack sx={{ mt: 4 }} spacing={2} alignItems="flex-start">
            <Button
              variant="outlined"
              href={fileLink}
              target="_blank"
              title={t('download.button.title')}
              rel="nofollow noopener"
              sx={{ textTransform: 'uppercase' }}
            >
              {t('download.button.label')}
            </Button>
            <Typography variant="body2">{t('download.version')}</Typography>
          </Stack>
        </Box>
      </Section>
    </>
  );
};
