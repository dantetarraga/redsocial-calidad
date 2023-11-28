import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./page/HomePage";
import SignInPage from "./page/SignInPage";
import GroupPage from "./page/GroupPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/group",
    element: <GroupPage />,
  },
]);

const App = () => {
  return <RouterProvider router={route} />;
};

export default App;
