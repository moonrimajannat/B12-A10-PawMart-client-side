import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../Components/Footer";

const Root = () => {
    const location = useLocation();
    const noHeader = location.pathname.includes('login') ||
        location.pathname.includes('register');
    return (
        <div>
            {noHeader || <Navbar></Navbar>}
            <Outlet></Outlet>
            <Footer />
        </div>
    );
}

export default Root;