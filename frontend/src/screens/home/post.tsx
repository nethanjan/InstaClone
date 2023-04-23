import {
	Avatar,
	Box,
	CardMedia,
	Grid,
	Modal,
	Paper,
	Typography,
} from "@mui/material";

interface IProps {
	modalClose: () => void;
	showModal: boolean;
	data: any;
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const imgLink =
	"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function PostView(props: IProps) {
	const { modalClose, showModal, data } = props;

	if (!data) return <></>;

	return (
		<Modal
			open={showModal}
			onClose={modalClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					{data?.title}
				</Typography>
				<CardMedia
					sx={{ height: 320, width: 600 }}
					image={data.image}
					title="Sample"
				/>
				<Paper
					style={{ padding: "40px 20px", maxHeight: 200, overflow: "auto" }}
				>
					<Grid container wrap="nowrap" spacing={2}>
						<Grid item>
							<Avatar alt="Remy Sharp" src={imgLink} />
						</Grid>
						<Grid justifyContent="left" item xs zeroMinWidth>
							<h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
							<p style={{ textAlign: "left" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
								luctus ut est sed faucibus. Duis bibendum ac ex vehicula
								laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
								interdum tortor. Quisque arcu quam, malesuada vel mauris et,
								posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
								In elit metus, efficitur lobortis nisi quis, molestie porttitor
								metus. Pellentesque et neque risus. Aliquam vulputate, mauris
								vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat
								quam lectus vitae ex.{" "}
							</p>
							<p style={{ textAlign: "left", color: "gray" }}>
								posted 1 minute ago
							</p>
						</Grid>
					</Grid>
					<Grid container wrap="nowrap" spacing={2}>
						<Grid item>
							<Avatar alt="Remy Sharp" src={imgLink} />
						</Grid>
						<Grid justifyContent="left" item xs zeroMinWidth>
							<h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
							<p style={{ textAlign: "left" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
								luctus ut est sed faucibus. Duis bibendum ac ex vehicula
								laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
								interdum tortor. Quisque arcu quam, malesuada vel mauris et,
								posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
								In elit metus, efficitur lobortis nisi quis, molestie porttitor
								metus. Pellentesque et neque risus. Aliquam vulputate, mauris
								vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat
								quam lectus vitae ex.
							</p>
							<p style={{ textAlign: "left", color: "gray" }}>
								posted 1 minute ago
							</p>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Modal>
	);
}
