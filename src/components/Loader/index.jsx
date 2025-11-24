import { ThreeDots } from 'react-loader-spinner';
import { Stack, useTheme } from '@mui/material';

export const Loader = () => {
  const theme = useTheme();
  return (
    <Stack alignContent="center" direction="row" justifyContent="center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        color={theme.palette.loader}
      />
    </Stack>
  );
};
