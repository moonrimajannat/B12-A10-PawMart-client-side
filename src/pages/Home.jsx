import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";
import CategorySection from "../Components/CategorySection";
import RecentListings from "../Components/RecentListing";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <CategorySection />
            <RecentListings />
            <Footer />
        </div>
    );
};

export default Home;