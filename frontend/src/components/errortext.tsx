import styled from "@emotion/styled";
import { Typography } from "@mui/material";

interface IProps {
	children: React.ReactNode;
}

export default function ErrorText(prop: IProps) {
	const StyledError = styled(Typography)`
		&& {
			font-family: Roboto;
			color: #d32f2f;
		}
	`;

	return <StyledError>{prop.children}</StyledError>;
}
