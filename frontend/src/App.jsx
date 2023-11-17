import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./page/HomePage";
import SignInPage from "./page/SignInPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

const App = () => {
  return <RouterProvider router={route} />;
};

export default App;
