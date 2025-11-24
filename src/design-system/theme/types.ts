import { TypographyVariantsOptions } from '@mui/material/styles/createTypography';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export enum ThemeName {
  Light = 'light',
  Dark = 'dark',
}

export interface ExtendedTypographyOptions extends TypographyVariantsOptions {
  ['h1/medium']: React.CSSProperties;
  ['h2/medium']: React.CSSProperties;
}
