import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import { useLight } from "@utils/actions/useLight";

// Create a theme instance.
export const getTheme = (light = true) =>
  createMuiTheme({
    palette: {
      primary: {
        main: "#556cd6"
      },
      secondary: {
        main: "#19857b"
      },
      error: {
        main: red.A400
      },
      type: light ? "light" : "dark"
    }
  });

export default function Theme(props) {
  const { light } = useLight();
  const theme = getTheme(light);
  return <ThemeProvider {...props} theme={theme} />;
}
