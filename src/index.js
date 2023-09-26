import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./utils/redux/store";
import persistStore from "redux-persist/es/persistStore";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persist = persistStore(store);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
