import { Typography, Link } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { CheckboxField } from '../FormFields';
import { getNormalizedLang } from '../../utils/languages';

export const AgreementsCheckbox = () => {
  const { i18n } = useTranslation();
  const lang = getNormalizedLang(i18n.resolvedLanguage);
  const termsHref = `/assets/agb/${lang}-agb.pdf`;
  const privacyHref = `/assets/privacy-policy/${lang}-privacy-policy.pdf`;

  const label = (
    <Typography sx={{ color: 'text.secondary' }} variant="body2">
      <Trans
        i18nKey="agreements.label"
        components={{
          terms: <Link href={termsHref} underline="hover" target="_blank" rel="noopener noreferrer" />,
          privacy: <Link href={privacyHref} underline="hover" target="_blank" rel="noopener noreferrer" />,
        }}
      />
    </Typography>
  );

  return <CheckboxField name="agree" label={label} />;
};
