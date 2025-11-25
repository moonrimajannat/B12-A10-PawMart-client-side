import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
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
                element: <Home></Home>,
            },
            {
                path: "/add-listing",
                element: <Home></Home>,
            },
            {
                path: "/my-listings",
                element: <Home></Home>,
            },
            {
                path: "/my-orders",
                element: <Home></Home>,
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
                element: <ListingDetails></ListingDetails>,
            },

        ]
    },
]);

export default router;