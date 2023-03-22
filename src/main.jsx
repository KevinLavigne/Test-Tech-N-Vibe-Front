import React from "react";
import ReactDOM from "react-dom/client";

import UserContext from "./contexts/UserContext";
import GeolocalisationContext from "./contexts/GeolocalisationContext";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContext.Provider>
      <GeolocalisationContext.Provider>
        <App />
      </GeolocalisationContext.Provider>
    </UserContext.Provider>
  </React.StrictMode>
);
