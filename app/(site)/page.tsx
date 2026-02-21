import Hero from "./components/Hero";
import ValueProps from "./components/ValueProps";
import ParallaxSection from "./components/ParallaxSection";
import Collections from "./components/Collections";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import PressMarquee from "./components/PressMarquee";
import HowItWorksPage from "./how-it-works/page";
import CelebrityFeature from "./components/CelebrityFeature";
import ComplimentaryGift from "./components/ComplimentaryGift";
import LabGrownDiamonds from "./components/LabGrownDiamonds";
import GiftGuide from "./components/GiftGuide";
import ShopByStyle from "./components/ShopByStyle";
import JewelrySpecialists from "./components/JewelrySpecialists";



export default function Home() {
  return (
    <>
      <Hero />
      <ComplimentaryGift />
      <ParallaxSection />
      <LabGrownDiamonds />
      <GiftGuide />
      <HowItWorksPage />     
      <Collections />     
      <PressMarquee/>         
      <CelebrityFeature />
      <Testimonials />
      <ShopByStyle/>
      <ValueProps />
      <JewelrySpecialists />
      <CTASection />
    </>
  );
}
