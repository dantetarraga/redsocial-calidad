import { Router, Routes } from "react-router-dom";
import HomePage from "../page/HomePage";
import SignInPage from "../page/SignInPage";

const Route = () => {
  return (
    <Routes>
      <Router path="/" element={<SignInPage />} />
      <Router path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default Route;
