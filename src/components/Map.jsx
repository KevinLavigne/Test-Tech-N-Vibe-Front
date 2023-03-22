import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, { useState } from "react";
import axios from "axios";
import L from "leaflet";

import StationCard from "./StationCard";

import "leaflet/dist/leaflet.css";

import icon from "../Images/icon.png";
import velibIcon from "../Images/velibIcon.webp";
import notify from "../services/Toastify";

export default function Map({ coords, velibs, velibsNear }) {
  const [mapCoords, setMapCoords] = useState(coords);
  const [address, setAddress] = useState();
  const [research, setResearch] = useState();

  const goTo = (latitude, longitude) => {
    setMapCoords({ latitude, longitude });
  };

  const convertAndGoTo = async () => {
    const data = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURI(
        address
      )}&apiKey=${import.meta.env.VITE_API_KEY}`
    );
    if (data.data.features[0]) {
      goTo(
        data.data.features[0].geometry.coordinates[1],
        data.data.features[0].geometry.coordinates[0]
      );
      setResearch({
        latitude: data.data.features[0].geometry.coordinates[1],
        longitude: data.data.features[0].geometry.coordinates[0],
      });
    } else notify("warning", "address not found");
  };

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });
  const stationIcon = new L.Icon({
    iconUrl: velibIcon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  function MapView() {
    const map = useMap();
    map.setView([mapCoords.latitude, mapCoords.longitude], map.getZoom(1));

    return null;
  }

  return (
    <div className="flex">
      <MapContainer
        classsName="map"
        center={[coords.latitude, coords.longitude]}
        zoom={20}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={customIcon}
          position={[coords.latitude, coords.longitude]}
        >
          <Popup>you are here</Popup>
        </Marker>
        {velibs.map((velib) => (
          <Marker
            icon={stationIcon}
            position={[velib.latitude, velib.longitude]}
          >
            <Popup>{velib.stationname}</Popup>
          </Marker>
        ))}
        {research && (
          <Marker
            icon={customIcon}
            position={[research.latitude, research.longitude]}
          >
            <Popup>Your research</Popup>
          </Marker>
        )}
        <MapView />
      </MapContainer>
      <div className="w-1/5 h-[80vh] flex flex-col justify-between gap-1">
        <h2 className=" text-center text-2xl">Nearest Velib Park</h2>
        {velibsNear.map((velib) => (
          <StationCard velib={velib} goTo={goTo} />
        ))}
        <button
          className="absolute top-[4vh] right-[2vh] text-3xl py-2 px-4 bg-slate-400 rounded-3xl"
          type="button"
          onClick={() => goTo(coords.latitude, coords.longitude)}
        >
          back to my position
        </button>
        <div className="absolute top-[4vh] left-[2vh] flex flex-col py-2 px-4 bg-slate-400 rounded-3xl gap-1">
          <h3 className="text-2xl">make a search by address </h3>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={"eg: 114 rue Vercingétorix, 75014 Paris"}
          />
          <button
            type="button"
            className="bg-slate-300 rounded-3xl w-fit self-center py-2 px-2 text-2xl"
            onClick={convertAndGoTo}
          >
            get position
          </button>
        </div>
      </div>
    </div>
  );
}
