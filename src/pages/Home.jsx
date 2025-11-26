
import Banner from "../components/Banner";
import CategorySection from "../components/CategorySection";
import PetHeroes from "../components/PetHeroes";
import RecentListings from "../components/RecentListing";
import WhyAdopt from "../components/WhyAdopt";
import Helmet from "../Helmet/Helmet";

const Home = () => {
    return (
        <div>
            <Helmet title="Home Page" />
            <Banner />
            <CategorySection></CategorySection>
            <RecentListings></RecentListings>
            <WhyAdopt></WhyAdopt>
            <PetHeroes></PetHeroes>
        </div>
    );
};

export default Home;