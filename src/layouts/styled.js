import { styled } from '@mui/material/styles';

export const StyledLayout = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;

  & > main {
    flex-grow: 1;
  }
`;
