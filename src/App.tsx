import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Button } from "@nextui-org/react";
import MainContainer from "./container/MainContainer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseConfig } from "./config/firebase.config";

initializeApp(firebaseConfig);
const auth = getAuth(getApp());

function App() {
  const [user] = useAuthState(auth);
  console.log(user?.displayName);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <MainContainer /> : <Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}
// KfW*hkMQ*9cgnxZ
export default App;
