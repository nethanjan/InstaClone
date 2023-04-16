import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import NavigationRoutes from "./routes";

export interface IRoutes {
	id: number;
	title: string;
	path: string;
	private?: boolean;
	component: FC;
}

function Navigation() {
	return (
		<Routes>
			{NavigationRoutes.map((page: IRoutes) => {
				return (
					<Route key={page.id} path={page.path} element={<page.component />} />
				);
			})}
		</Routes>
	);
}

export default Navigation;
