import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTERS } from '../../../../../../constants';
import { FILTERS } from '../../constants';

export const EmptyState = ({ filter }) => {
  const { t } = useTranslation('profile');

  switch (filter) {
    case FILTERS.ALL: {
      return (
        <Trans i18nKey="empty.paid">
          You have no requests yet -{' '}
          <Link component={RouterLink} to={ROUTERS.UPLOAD}>
            Create your first one
          </Link>
        </Trans>
      );
    }

    case FILTERS.PAID: {
      return <Typography>{t('empty.paid')}</Typography>;
    }

    case FILTERS.UNPAID: {
      return <Typography>{t('empty.unpaid')}</Typography>;
    }
    default:
      return null;
  }
};
