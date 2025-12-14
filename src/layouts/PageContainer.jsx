import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

export const PageContainer = styled(props => <Container maxWidth={false} {...props} />)(({ theme }) => ({
  maxWidth: 1312,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: theme.spacing(2), // 16
  paddingRight: theme.spacing(2), // 16

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3), // 24
    paddingRight: theme.spacing(3),
  },

  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(8), // 64
    paddingRight: theme.spacing(8),
  },
}));
