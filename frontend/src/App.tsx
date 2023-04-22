import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Auth } from "aws-amplify";

import Navigation from "./routes";
import awsconfig from "./aws-exports";

Auth.configure(awsconfig);

function App() {
	return (
		<>
			<Routes>
				<Route path="/*" element={<Navigation />} />
			</Routes>
		</>
	);
}

export default App;
