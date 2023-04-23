import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/navbar";

interface Props {
	children: React.ReactNode;
}

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#ffffff",
		},
		secondary: {
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
	return (
		<ThemeProvider theme={theme}>
			<NavBar />
			{prop.children}
		</ThemeProvider>
	);
}

export default PageTemplate;
