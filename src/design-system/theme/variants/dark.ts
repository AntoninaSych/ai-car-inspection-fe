import { Theme } from '@mui/material/styles';
import { DeepPartial, ThemeName } from '../types';

export const darkVariant: DeepPartial<Theme> = {
    palette: {
        mode: ThemeName.Dark,
    }
};
