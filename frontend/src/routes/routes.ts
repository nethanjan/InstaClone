import { IRoutes } from ".";
import HomePage from "../screens/home";
import LoginPage from "../screens/login";
import PostPage from "../screens/post";
import RegisterPage from "../screens/register";
import VerificationPage from "../screens/register/verify";

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
	{
		id: 3,
		title: "Register Page",
		path: "/register",
		component: RegisterPage,
	},
	{
		id: 4,
		title: "Login Page",
		path: "/login",
		component: LoginPage,
	},
	{
		id: 5,
		title: "Verification Page",
		path: "/verification",
		component: VerificationPage,
	},
];
export default NavigationRoutes;
