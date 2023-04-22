import { Box, Button, Container, Grid, Link, TextField } from "@mui/material";
import PageTemplate from "../../templates/PageTemplate";
import React from "react";
import { Auth } from "aws-amplify";

export default function RegisterPage() {
	const [serverError, setServerError] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [name, setName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");

	const onEmailChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(event?.target.value);
		},
		[]
	);

	const onNameChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setName(event?.target.value);
		},
		[]
	);

	const onPasswordChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(event?.target.value);
		},
		[]
	);

	const onConfirmPasswordChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setConfirmPassword(event?.target.value);
		},
		[]
	);

	const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await Auth.signUp({
				username: email,
				password: password,
				attributes: {
					name: name,
				},
			})
				.then(() => {
					window.location.href = "/";
				})
				.catch((err) => {
					console.log(err);
					setServerError("Server Error");
				});
		} catch (e) {
			console.log(e);
			setServerError("Server Error");
		}
	};

	return (
		<PageTemplate>
			<Box sx={{ bgcolor: "#5282d1" }}>
				<div>
					<Container component="main" maxWidth="xs">
						<Box
							sx={{
								marginTop: 8,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<h1>Sign up</h1>
							<form onSubmit={onSubmit} noValidate method="POST">
								<TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
									onChange={onEmailChnage}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="name"
									label="Your Name"
									name="name"
									autoComplete="name"
									autoFocus
									onChange={onNameChnage}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									onChange={onPasswordChnage}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									name="confirm_password"
									label="Confirm Password"
									type="password"
									id="confirm_password"
									onChange={onConfirmPasswordChnage}
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Sign Up
								</Button>
								<Grid container>
									<Grid item xs>
										<Link href="#" variant="body2">
											Forgot password?
										</Link>
									</Grid>
								</Grid>
							</form>
						</Box>
					</Container>
				</div>
			</Box>
		</PageTemplate>
	);
}
