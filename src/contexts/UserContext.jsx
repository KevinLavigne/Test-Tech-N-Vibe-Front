import { createContext, useState } from "react";

const Context = createContext();

function Provider({ children }) {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const handleUser = (value) => {
    sessionStorage.setItem("user", JSON.stringify(value));
    setUser(value);
  };

  return (
    <Context.Provider
      value={{
        user,
        handleUser,
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
