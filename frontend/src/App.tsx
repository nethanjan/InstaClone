import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes";

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
