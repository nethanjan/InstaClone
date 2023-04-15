import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface Props {
	children: React.ReactNode;
}

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			// Purple and green play nicely together.
			main: "#160042",
		},
		secondary: {
			// This is green.A700 as hex.
			main: "#11cb5f",
		},
	},
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});

theme.typography.h1 = {
	fontSize: "3.2rem",
	"@media (min-width:600px)": {
		fontSize: "3rem",
	},
	[theme.breakpoints.up("md")]: {
		fontSize: "5rem",
	},
};

function PageTemplate(prop: Props) {
	return <ThemeProvider theme={theme}>{prop.children}</ThemeProvider>;
}

export default PageTemplate;
