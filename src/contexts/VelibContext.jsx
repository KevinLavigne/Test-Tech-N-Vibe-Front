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
			`/velib/${coords.latitude}/${coords.longitude}`
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
