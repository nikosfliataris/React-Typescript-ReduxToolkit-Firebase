import React from "react";
import logo from "./logo.svg";
import { Counter } from "./Redux/features/counter/Counter";
import "./App.scss";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="component">
        <Routes>
          <Route
            path="/signin"
            element={
              // <Suspense fallback={<Spinner />}>
              <SignIn />
              // </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
