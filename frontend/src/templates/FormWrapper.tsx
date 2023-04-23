import { Box, Container, Grid } from "@mui/material";

interface IProps {
	children: React.ReactNode;
}

export default function FormWrapper(prop: IProps) {
	return (
		<Box>
			<Container component="main" maxWidth="xs">
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="flex-start"
					style={{ minHeight: "100vh" }}
				>
					<Grid item xs={3}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							{prop.children}
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
