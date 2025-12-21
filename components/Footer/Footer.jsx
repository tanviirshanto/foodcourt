import FooterBottom from "./FooterBottom";
import FooterContainer from "./FooterContainer";
import FooterLinks from "./FooterLinks ";
import FooterSocials from "./FooterSocials";
import FooterBrand from "./FooterBrand";


const Footer = () => {
  return (
    <FooterContainer>
      <div className="flex flex-wrap lg:flex-nowrap gap-6 lg:gap-14 py-10 lg:py-24 w-[95%] mx-auto">
        <FooterBrand />
        <FooterLinks />
        <FooterSocials />
      </div>
      <FooterBottom />
    </FooterContainer>
  );
};

export default Footer;
