import { useContext, useEffect, useState } from 'react';

import Toaster from '../components/Toaster';
import apiConnexion from '../services/apiConnexion';
import UserContext from '../contexts/UserContext';
import GeolocationContext from '../contexts/GeolocalisationContext';
import notify from '../services/Toastify';
import Map from '../components/Map';

import { useMapEvent } from 'react-leaflet';

function Home() {
	const { user } = useContext(UserContext.Context);
	const { pos } = useContext(GeolocationContext.Context);

	const [velibs, setVelibs] = useState([]);
	const [velibsNear, setVelibsNear] = useState([]);

	const getVelibLocation = async () => {
		try {
			const { data } = await apiConnexion.get(`/velib`);
			setVelibs(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getVelibNear = async () => {
		try {
			const { data } = await apiConnexion.get(
				`/velib/${pos.latitude}/${pos.longitude}`
			);
			setVelibsNear(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getVelibLocation();
		getVelibNear();
	}, []);

	return (
		<div className="flex flex-col justify-center lg:justify-start items-center min-h-[100vh] bg-slate-200 lg: pt-20">
			<Toaster />
			{console.log(pos)}
			<h1 className="text-4xl mt-4 mb-6">Welcome {user.email}</h1>
			<div className="flex w-full p-2 gap-1">
				<Map
					coords={{ latitude: pos.latitude, longitude: pos.longitude }}
					velibs={velibs}
					velibsNear={velibsNear}
				/>
			</div>
		</div>
	);
}
export default Home;
