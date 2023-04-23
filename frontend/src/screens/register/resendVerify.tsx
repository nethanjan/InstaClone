import { Button, Typography, styled } from "@mui/material";
import React from "react";
import { Auth } from "aws-amplify";
import ContrastTextField from "../../components/styledTextFeild";

interface IProps {
	reset: (val: boolean) => void;
}

const validRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const StyledError = styled(Typography)`
	&& {
		font-family: Roboto;
		color: #f44336;
	}
`;

export default function ResendVerificationPage({ reset }: IProps) {
	const [serverError, setServerError] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [emailError, setEmailError] = React.useState("");

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

	const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (email) {
			try {
				await Auth.resendSignUp(email)
					.then(() => {
						window.location.href = "/verification";
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
		<>
			<h1>Resend Verification</h1>
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
				{serverError ? <StyledError>{serverError}</StyledError> : null}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3 }}
					color="secondary"
				>
					Resend
				</Button>
				<Button
					type="button"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 5 }}
					onClick={() => reset(false)}
				>
					Back
				</Button>
			</form>
		</>
	);
}
