import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: {
      poppins: string;
    };
    colors: {
      primary: string;
      secondary: string;
      backgroundPrimary: string;
      backgroundSecondary: string;
      textPrimary: string;
      textSecondary: string;
      error: string;
    };
  }
}
