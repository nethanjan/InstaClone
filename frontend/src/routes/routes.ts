import { IRoutes } from ".";
import HomePage from "../screens/home";
import PostPage from "../screens/post";

const NavigationRoutes: Array<IRoutes> = [
	{
		id: 1,
		title: "Home Page",
		path: "/",
		component: HomePage,
	},
	{
		id: 2,
		title: "Favourites Page",
		path: "/post/:slug",
		component: PostPage,
	},
];
export default NavigationRoutes;
