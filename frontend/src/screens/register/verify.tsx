import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import PageTemplate from "../../templates/PageTemplate";
import React from "react";
import { Auth } from "aws-amplify";
import ResendVerificationPage from "./resendVerify";
import FormWrapper from "../../templates/formWrapper";
import ContrastTextField from "../../components/styledTextFeild";

const validRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const StyledError = styled(Typography)`
	&& {
		font-family: Roboto;
		color: #f44336;
	}
`;

export default function VerificationPage() {
	const [serverError, setServerError] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [emailError, setEmailError] = React.useState("");
	const [code, setCode] = React.useState("");
	const [codeError, setCodeError] = React.useState("");
	const [resend, setResend] = React.useState(false);

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

	const onCodeChnage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (!event?.target.value) {
				setCodeError("Verification code is required");
			} else {
				setCode(event?.target.value);
				setCodeError("");
			}
		},
		[]
	);

	const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (email && code) {
			try {
				await Auth.confirmSignUp(email, code)
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
		<PageTemplate>
			<FormWrapper>
				{resend ? (
					<ResendVerificationPage reset={setResend} />
				) : (
					<>
						<h1>Verify Account</h1>
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
								id="code"
								label="Verification Code"
								name="code"
								error={codeError.length > 0}
								helperText={codeError}
								autoFocus
								onChange={onCodeChnage}
							/>
							{serverError ? <StyledError>{serverError}</StyledError> : null}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3 }}
								color="secondary"
							>
								Verify
							</Button>

							<Button
								type="button"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 5, backgroundColor: "#5b72f5" }}
								onClick={() => setResend(true)}
							>
								Resend
							</Button>
						</form>
					</>
				)}
			</FormWrapper>
		</PageTemplate>
	);
}
