import { useContext, useEffect, useState } from "react";

import Toaster from "../components/Toaster";
import apiConnexion from "../services/apiConnexion";
import UserContext from "../contexts/UserContext";
import GeolocationContext from "../contexts/GeolocalisationContext";
import Map from "../components/Map";
import notify from "../services/Toastify";

function Home() {
  const { user } = useContext(UserContext.Context);
  const { pos } = useContext(GeolocationContext.Context);

  const [velibs, setVelibs] = useState([]);
  const [velibsNear, setVelibsNear] = useState([]);

  const getVelibLocation = async () => {
    try {
      const { data } = await apiConnexion.get(`/velib`);
      setVelibs(data);
    } catch {
      notify("error", "something bad happend");
    }
  };

  const getVelibNear = async () => {
    try {
      const { data } = await apiConnexion.get(
        `/velib/${pos.latitude}/${pos.longitude}`
      );
      setVelibsNear(data);
    } catch {
      notify("error", "something bad happend");
    }
  };

  useEffect(() => {
    getVelibLocation();
    getVelibNear();
  }, []);

  return (
    <div className="flex flex-col justify-center lg:justify-start items-center min-h-[100vh] bg-slate-200 lg: pt-20">
      <Toaster />
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
