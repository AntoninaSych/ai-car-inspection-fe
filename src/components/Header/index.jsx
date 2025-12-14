import { Toolbar, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Brand, AuthBar, UserBar, LanguageSwitcher } from './components';
import { StyledAppBar } from './styled';
import { selectIsAuthorized } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/slice';
import { PageContainer } from '../../layouts';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleOnLogout = () => {
    dispatch(openModal({ type: 'logout' }));
  };

  return (
    <StyledAppBar position="fixed" elevation={0}>
      <PageContainer>
        <Toolbar disableGutters>
          <Brand />
          <Box sx={{ flexGrow: 1 }} />
          {isAuthorized ? <UserBar onLogout={handleOnLogout} /> : <AuthBar />}
          <LanguageSwitcher />
        </Toolbar>
      </PageContainer>
    </StyledAppBar>
  );
};
