import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";
import CategorySection from "../Components/CategorySection";
import RecentListings from "../Components/RecentListing";
import Helmet from "../Helmet/Helmet";

const Home = () => {
    return (
        <div>
            <Helmet title="Home Page" />
            <Navbar />
            <Banner />
            <CategorySection />
            <RecentListings />
            <Footer />
        </div>
    );
};

export default Home;