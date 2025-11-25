import Footer from "../Components/Footer";
import Banner from "../Components/Banner";
import CategorySection from "../Components/CategorySection";
import RecentListings from "../Components/RecentListing";
import Helmet from "../Helmet/Helmet";
import WhyAdopt from "../components/WhyAdopt";
import PetHeroes from "../components/PetHeroes";

const Home = () => {
    return (
        <div>
            <Helmet title="Home Page" />
            <Banner />
            <CategorySection />
            <RecentListings />
            <WhyAdopt />
            <PetHeroes />
        </div>
    );
};

export default Home;