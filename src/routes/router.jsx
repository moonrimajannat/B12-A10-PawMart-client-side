import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/> ,
     children: [
            
      {
                path: "/",
                element: <Home></Home> ,
            },
            {
                path: "/pets-supplies",
                element: <Home></Home> ,
            },
            {
                path: "/add-listing",
                element: <Home></Home> ,
            },
            {
                path: "/my-listings",
                element: <Home></Home> ,
            },
            {
                path: "/my-orders",
                element: <Home></Home> ,
            },
            {
                path: "/login",
                element: <Home></Home> ,
            },
            {
                path: "/register",
                element: <Home></Home> ,
            },

        ]
  },
]);

export default router;