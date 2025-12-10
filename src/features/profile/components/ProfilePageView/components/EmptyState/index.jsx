import { Link, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTERS } from '../../../../../../constants';
import { FILTERS } from '../../constants';

export const EmptyState = ({ filter }) => {
  const { t } = useTranslation('profile');

  switch (filter) {
    case FILTERS.ALL: {
      return (
        <Box>
          <Trans i18nKey="profile:empty.all">
            You have no requests yet -
            <Link component={RouterLink} to={ROUTERS.UPLOAD}>
              create your first one
            </Link>
          </Trans>
        </Box>
      );
    }

    case FILTERS.PAID: {
      return (
        <Box>
          <Typography>{t('empty.paid')}</Typography>
        </Box>
      );
    }

    case FILTERS.UNPAID: {
      return (
        <Box>
          <Typography>{t('empty.unpaid')}</Typography>
        </Box>
      );
    }
    default:
      return null;
  }
};
