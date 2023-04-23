import { Button, TextField, styled } from "@mui/material";
import PageTemplate from "../../templates/PageTemplate";
import React from "react";
import { Auth } from "aws-amplify";
import FormWrapper from "../../templates/formWrapper";
import ErrorText from "../../components/errortext";

const validRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ContrastTextField = styled(TextField)`
	& label.Mui-focused {
		color: black;
	}
	& .MuiOutlinedInput-root {
		&.Mui-focused fieldset {
			border-color: black;
		}
	}
`;

export default function LoginPage() {
	const [serverError, setServerError] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [emailError, setEmailError] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordError, setPasswordError] = React.useState("");

	const onEmailChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (event?.target.value.length > 254) {
				setEmailError("Too many characters in the email.");
			} else if (!event?.target.value.match(validRegex)) {
				setEmailError("Invalid email address.");
			} else {
				setEmail(event?.target.value);
				setEmailError("");
			}
		},
		[]
	);

	const onPasswordChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (!event?.target.value) {
				setPasswordError("Password is required");
			} else {
				setPassword(event.target.value);
			}
		},
		[]
	);

	const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (email && password) {
			try {
				await Auth.signIn({
					username: email,
					password: password,
				})
					.then(() => {
						window.location.href = "/";
					})
					.catch((err) => {
						setServerError("User name or email address incorrect");
					});
			} catch (e: any) {
				setServerError("Something went wrong");
			}
		} else {
			setServerError("Please fill all the required fields");
		}
	};

	return (
		<PageTemplate>
			<FormWrapper>
				<h1>Sign in</h1>
				<form onSubmit={onSubmit} noValidate method="POST">
					<ContrastTextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						error={emailError.length > 0}
						helperText={emailError}
						autoFocus
						onChange={onEmailChnage}
					/>
					<ContrastTextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						error={passwordError.length > 0}
						helperText={passwordError}
						onChange={onPasswordChnage}
					/>
					{serverError ? <ErrorText>{serverError}</ErrorText> : null}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						sx={{ mt: 3, mb: 5 }}
					>
						Sign In
					</Button>
				</form>
			</FormWrapper>
		</PageTemplate>
	);
}
