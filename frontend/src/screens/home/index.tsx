import { Card, CardActions, CardMedia, Grid, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PageTemplate from "../../templates/PageTemplate";
import PostView from "./post";
import React from "react";

const posts = [
	{
		id: 1,
		title: "First Title",
		image: "https://asia.olympus-imaging.com/content/000107507.jpg",
	},
	{
		id: 2,
		title: "Second Title",
		image:
			"https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
	},
	{
		id: 3,
		title: "Third Title",
		image: "https://asia.olympus-imaging.com/content/000107510.jpg",
	},
];

function HomePage() {
	const [open, setOpen] = React.useState(false);
	const [currentPost, setCurrentPost] = React.useState(null);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleModalOpen = (post: any) => {
		setCurrentPost(post);
		handleOpen();
	};

	return (
		<PageTemplate>
			<Grid container spacing={2} sx={{ pl: 10, pt: 2, pr: 10, pb: 10 }}>
				<PostView
					showModal={open}
					data={currentPost}
					modalClose={handleClose}
				/>

				{posts.map((post) => {
					return (
						<Grid item xs={12} sm={6} md={4} key={post.id}>
							<Card
								sx={{ height: "100%" }}
								onClick={() => handleModalOpen(post)}
							>
								<CardMedia
									sx={{ height: 240 }}
									image={post.image}
									title="Sample"
								>
									<CardActions
										disableSpacing
										sx={{
											alignSelf: "stretch",
											display: "flex",
											justifyContent: "flex-end",
											alignItems: "flex-start",
										}}
									>
										<IconButton
											aria-label="add to favorites"
											radioGroup="sm"
											sx={{
												color: "#19014a",
												border: 1,
												borderColor: "#fff",
												backgroundColor: "#fff",
											}}
										>
											<FavoriteIcon />
										</IconButton>
									</CardActions>
								</CardMedia>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</PageTemplate>
	);
}

export default HomePage;
