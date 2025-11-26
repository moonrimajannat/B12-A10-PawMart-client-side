import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Mylistings from "../components/Mylistings";
import Listingdetails from "../components/Listingdetails";
import Addlisting from "../components/Addlisting";
import Petssupplies from "../components/PetsSupplies";


const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        element: <Root />,
        children: [

            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/pets-supplies",
                element: <Petssupplies/>,
            },
            {
                path: "/add-listing",
                element: <PrivateRoute><Addlisting/></PrivateRoute> ,
            },
            {
                path: "/my-listings",
                element: <PrivateRoute><Mylistings/></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/listingDetails/:id",
                element: <Listingdetails/>,
            },

        ]
    },
]);

export default router;