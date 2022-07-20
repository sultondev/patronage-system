import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App/App.component";
import "./index.css";
import { RecoilRoot } from "recoil"
import SignIn from "./components/Auth/SignIn.component";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
