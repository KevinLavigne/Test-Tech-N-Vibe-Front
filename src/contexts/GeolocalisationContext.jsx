import { createContext, useState, useEffect } from 'react';
import notify from '../services/Toastify';

const Context = createContext();

function Provider({ children }) {
	const [pos, setPos] = useState(
		JSON.parse(sessionStorage.getItem('position'))
	);
	if (!navigator.geolocation) {
		notify(warning, `Your browser doesn't support Geolocation`);
	}

	const onSuccess = (position) => {
		console.log(position);
		sessionStorage.setItem(
			'position',
			JSON.stringify({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			})
		);
		setPos({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
	};
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess);
		console.log('try to get pos');
	}, []);
	return (
		<Context.Provider
			value={{
				pos,
			}}
		>
			{children}
		</Context.Provider>
	);
}
const ExportContext = {
	Context,
	Provider,
};
export default ExportContext;
