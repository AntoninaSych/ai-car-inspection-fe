import { Theme } from '@mui/material/styles';
import { DeepPartial, ThemeName } from '../types';

export const lightVariant: DeepPartial<Theme> = {
    palette: {
        mode: ThemeName.Light,
    }
};
