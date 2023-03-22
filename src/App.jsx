import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './layout/ProtectedRoute';

import userContext from './contexts/UserContext';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/SignUp';

function App() {
	const { user } = useContext(userContext.Context);
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/SignUp" element={<SignUp />} />
				<Route path="/user" element={<ProtectedRoute user={user} />}>
					<Route path="home" element={<Home />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
