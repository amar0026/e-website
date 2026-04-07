import Image from "next/image";
import Navbar from "./Components/Home/Navbar";
import HeroSection from "./Components/Home/HeroSection";
import CollectionSection from "./Components/Home/CollectionSection";
import FeaturedProducts from "./Components/Home/FeatureProduct";
import LatestProducts from "./Components/Home/LatestProduct";
import ArticlesSection from "./Components/Home/ArticleSection";
import Footer from "./Components/Home/Footer";
import HappyCustomers from "./Components/Home/HappyCustomer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
      <HeroSection/>
      <CollectionSection/>
      <FeaturedProducts/>
      <LatestProducts/>
      <ArticlesSection/>
      <HappyCustomers/>
      
    </div>
  );
}
