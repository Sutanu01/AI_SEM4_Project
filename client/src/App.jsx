import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/learning" element={<MainPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};
export default App;