import { Button, TextField, Typography, styled } from "@mui/material";
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

export default function RegisterPage() {
	const [serverError, setServerError] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [emailError, setEmailError] = React.useState("");
	const [name, setName] = React.useState("");
	const [nameError, setNameError] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordError, setPasswordError] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

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

	const onNameChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (!event?.target.value) {
				setNameError("Name is required");
			} else if (event?.target.value.length > 254) {
				setNameError("Too many characters in the name.");
			} else {
				setName(event?.target.value);
				setNameError("");
			}
		},
		[]
	);

	const onPasswordChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (!event?.target.value) {
				setPasswordError("Password is required");
			} else if (event?.target.value.length > 20) {
				setPasswordError("Too many characters in the password.");
			} else {
				const specialCharPattern = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;
				const upperCasePattern = /[A-Z]/;
				const lowerCasePattern = /[a-z]/;
				const numberPattern = /[0-9]/;
				if (!specialCharPattern.test(event.target.value)) {
					setPasswordError(
						"Password should have at least a special character."
					);
				} else if (!upperCasePattern.test(event.target.value)) {
					setPasswordError(
						"Password should have at least an uppercase character."
					);
				} else if (!lowerCasePattern.test(event.target.value)) {
					setPasswordError(
						"Password should have at least a lowercase character."
					);
				} else if (!numberPattern.test(event.target.value)) {
					setPasswordError(
						"Password should have at least a numeric character."
					);
				} else if (event.target.value.length < 8) {
					setPasswordError("Password should have at least 8 characters.");
				} else {
					setPassword(event.target.value);
					setPasswordError("");
				}
			}
		},
		[]
	);

	const onConfirmPasswordChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (!event.target.value) {
				setConfirmPasswordError("Password confirmation is required");
			} else if (event.target.value !== password) {
				setConfirmPasswordError(
					"Password and Password confirmation do not match"
				);
			} else {
				setConfirmPassword(event.target.value);
				setConfirmPasswordError("");
			}
		},
		[password]
	);

	const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (email && name && password && confirmPassword) {
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
						setServerError(err.message);
					});
			} catch (e: any) {
				console.log(e.message);
				setServerError("Something went wrong");
			}
		} else {
			setServerError("Please fill all the required fields");
		}
	};

	return (
		<PageTemplate>
			<FormWrapper>
				<h1>Sign up</h1>
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
						id="name"
						label="Your Name"
						name="name"
						autoComplete="name"
						error={nameError.length > 0}
						helperText={nameError}
						autoFocus
						onChange={onNameChnage}
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
					<ContrastTextField
						margin="normal"
						required
						fullWidth
						name="confirm_password"
						label="Confirm Password"
						type="password"
						id="confirm_password"
						error={confirmPasswordError.length > 0}
						helperText={confirmPasswordError}
						onChange={onConfirmPasswordChnage}
					/>
					{serverError ? <ErrorText>{serverError}</ErrorText> : null}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						sx={{ mt: 3, mb: 5 }}
					>
						Sign Up
					</Button>
				</form>
			</FormWrapper>
		</PageTemplate>
	);
}
