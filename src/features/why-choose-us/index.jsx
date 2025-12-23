import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { WHY_CHOOSE_US_ITEMS } from './constants/items';
import { WhyChooseUsCard } from './components';
import { Section } from '../../layouts';

export const WhyChooseUsSection = () => {
  const { t } = useTranslation('whyChooseUs');

  return (
    <Section>
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography component="h2" variant="h3">
          {t('title')}
        </Typography>

        <Typography>{t('subtitle')}</Typography>
      </Stack>

      <Stack spacing={3} direction={{ xs: 'column', lg: 'row' }} sx={{ mt: 6 }}>
        {WHY_CHOOSE_US_ITEMS.map(({ key, Icon, borderColor, bgColor, iconBg }) => (
          <WhyChooseUsCard
            key={key}
            title={t(`items.${key}.title`)}
            description={t(`items.${key}.description`)}
            Icon={Icon}
            borderColor={borderColor}
            bgColor={bgColor}
            iconBg={iconBg}
          />
        ))}
      </Stack>
    </Section>
  );
};
