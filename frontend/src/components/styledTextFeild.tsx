import styled from "@emotion/styled";
import { TextField } from "@mui/material";

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

export default ContrastTextField;
