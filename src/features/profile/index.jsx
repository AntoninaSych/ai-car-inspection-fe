import { Alert, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Loader } from '../../components';
import { useProfileData } from './hook/useProfileData';
import { ProfilePageView } from './components';

export const Profile = () => {
  const { t } = useTranslation(['profile', 'report', 'common']);
  const { tasks, isLoading, error } = useProfileData();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mt: 3 }}>
        <AlertTitle>{t('common:errors.unknown', 'An error occurred. Please try again later.')}</AlertTitle>
      </Alert>
    );
  }

  return <ProfilePageView tasks={tasks} isLoading={isLoading} />;
};
