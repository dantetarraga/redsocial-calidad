import { Router, Routes } from "react-router-dom";
import HomePage from "../page/HomePage";
import SignInPage from "../page/SignInPage";
import GroupPage from "../page/GroupPage"

const Route = () => {
  return (
    <Routes>
      <Router path="/" element={<SignInPage />} />
      <Router path="/home" element={<HomePage />} />
      <Router path="/group" element={<GroupPage />} />

    </Routes>
  );
};

export default Route;
