import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { Auth } from "aws-amplify";

export default function NavBar() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [userFetched, setUserFetched] = React.useState(0);
	const [userName, setUserName] = React.useState("User");
	const navigate = useNavigate();

	React.useEffect(() => {
		if (userFetched === 0) {
			fetchUser();
		}
		return () => {};
	}, []);

	async function fetchUser() {
		await Auth.currentAuthenticatedUser()
			.then((user) => {
				setUserFetched(1);
				setUserName(user.attributes.name);
			})
			.catch(() => {
				setUserFetched(-1);
			});
	}

	const handleOpenNavMenu = React.useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			setAnchorElNav(event.currentTarget);
		},
		[anchorElNav]
	);

	const handleCloseNavMenu = React.useCallback(() => {
		setAnchorElNav(null);
	}, []);

	const handleNavigation = React.useCallback((url: string) => {
		navigate(url);
	}, []);

	const handleSignOut = React.useCallback(async () => {
		await Auth.signOut();
		window.location.href = "/";
	}, [anchorElNav]);

	const renderDesktopMenu = () => {
		if (userFetched === 0) {
			return <></>;
		}
		if (userFetched === 1) {
			return (
				<>
					<Button color="inherit">Hello, {userName}</Button>
					<Button color="inherit" onClick={() => handleSignOut()}>
						Sign out
					</Button>
				</>
			);
		}
		return (
			<>
				<Button color="inherit" onClick={() => handleNavigation("/register")}>
					Register
				</Button>
				<Button color="inherit" onClick={() => handleNavigation("/login")}>
					Login
				</Button>
			</>
		);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters data-testid="navbar">
					<Diversity1Icon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
						data-testid="mobile-logo"
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						InstaClone
					</Typography>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							role="menu-open"
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>

						{userFetched === 1 ? (
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								<MenuItem>
									<Typography textAlign="center">Hello, {userName}</Typography>
								</MenuItem>
								<MenuItem onClick={() => handleSignOut()}>
									<Typography textAlign="center">Sign out</Typography>
								</MenuItem>
							</Menu>
						) : (
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								<MenuItem onClick={() => handleNavigation("/register")}>
									<Typography textAlign="center">Register</Typography>
								</MenuItem>
								<MenuItem onClick={() => handleNavigation("/login")}>
									<Typography textAlign="center">Login</Typography>
								</MenuItem>
							</Menu>
						)}
					</Box>

					<Diversity1Icon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						data-testid="desktop-logo"
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						onClick={() => handleNavigation("/")}
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontWeight: 700,
							letterSpacing: ".2rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						InstaClone
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
						{renderDesktopMenu()}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
