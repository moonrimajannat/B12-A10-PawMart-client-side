import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import AddListing from "../components/AddListing";
import PrivateRoute from "./PrivateRoute";
import PetsSupplies from "../components/PetsSupplies";
import MyListings from "../components/MyListings";
import ListingDetails from "../components/ListingDetails";


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
                element: <PetsSupplies/>,
            },
            {
                path: "/add-listing",
                element: <PrivateRoute><AddListing/></PrivateRoute> ,
            },
            {
                path: "/my-listings",
                element: <PrivateRoute><MyListings/></PrivateRoute>,
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
                element: <ListingDetails/>,
            },

        ]
    },
]);

export default router;