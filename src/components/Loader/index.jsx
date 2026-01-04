import { ThreeDots } from 'react-loader-spinner';
import { Stack, useTheme } from '@mui/material';

export const Loader = ({ light = false }) => {
  const theme = useTheme();
  return (
    <Stack alignContent="center" direction="row" justifyContent="center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        radius="9"
        ariaLabel="loading..."
        wrapperStyle={{}}
        color={light ? theme.palette.common.white : theme.palette.primary.main}
      />
    </Stack>
  );
};
