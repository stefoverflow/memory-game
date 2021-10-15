import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "store/configureStore";
import routes from "router/routes";
import Routes from "router/components/Routes/Routes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes routes={routes} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
