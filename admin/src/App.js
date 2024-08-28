import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app-router";
import "./App.css";
import { useEffect, useState } from "react";
import { getMasterData } from "./services/shared.service";
import { Authorization } from "./middleware/authorization";
import UserContext from "./services/user-context.service";
import { getStorageValue } from "./services/storage.service";
import store from "./services/redux-service";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getLoggedInUserData();
  }, []);

  function getLoggedInUserData() {
    // const userDetails = getStorageValue("userDetails");
    store.subscribe(() => {
      const userDetails = store.getState()?.userDetails;
      setUser(userDetails);
      if (userDetails) {
        getMasterData();
      }
    });
  }
  return (
    <BrowserRouter>
      <div className="container">
        <UserContext.Provider value={user}>
          <Authorization>
            <AppRouter />
          </Authorization>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
