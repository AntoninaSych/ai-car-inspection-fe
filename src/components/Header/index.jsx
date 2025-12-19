import { Toolbar, Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AuthBar, UserBar, LanguageSwitcher } from './components';
import { selectIsAuthorized } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/slice';
import { PageContainer } from '../../layouts';
import { GetStarted } from '../GetStarted';
import { Brand } from '../Brand';
import ElevationScroll from './hocs/ElevationScroll';
import { StyledAppBar } from './styled';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleOnLogout = () => {
    dispatch(openModal({ type: 'logout' }));
  };

  return (
    <ElevationScroll>
      <StyledAppBar position="fixed">
        <PageContainer>
          <Toolbar disableGutters>
            <Brand />
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" gap={{ xs: 1.5, md: 3 }} alignItems="center">
              <LanguageSwitcher />
              {isAuthorized ? <UserBar onLogout={handleOnLogout} /> : <AuthBar />}
              <GetStarted />
            </Stack>
          </Toolbar>
        </PageContainer>
      </StyledAppBar>
    </ElevationScroll>
  );
};
